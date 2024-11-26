import { Injectable } from '@nestjs/common';

import { Document } from '@langchain/core/documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';

import { ConversationDto } from '@leek/assistants/dto/conversation.dto';
import { ConfigureAdapter } from '@leek/configure';
import { STREAMING_RESPONSE_END_MARKER, IndexType, LanguageModels, LLMProvider } from '@leek/constants';
import { initEmbeddings, initModels } from '@leek/langchain';

import { DocumentDto } from '../dto/document.dto';
import { RetrievalModelDto } from '../dto/retrieval-model.dto';
import { SimilaritySearchDto } from '../dto/similarity-search.dto';
import { DatasetRepository } from '../infrastructure/persistence/dataset.repository';
import { DocumentSegmentRepository } from '../infrastructure/persistence/document-segment.repository';
import { EmbeddingRepository } from '../infrastructure/persistence/embedding.repository';
import { RAGChatHistoryPrompt } from '../shared/prompts/rag-chat-history.prompt';
import { generateVectorClassPrefixByDatasetId } from '../shared/utils/generate-vector-class-prefix-by-dataset-id.util';

@Injectable()
export class RetrievalService {
  constructor(
    private readonly configureService: ConfigureAdapter,
    private readonly embeddingRepository: EmbeddingRepository,
    private readonly datasetRepository: DatasetRepository,
    private readonly documentSegmentRepository: DocumentSegmentRepository,
  ) {}

  /**
   * Performs a similarity search using vector embeddings and returns matching documents with optional scores.
   *
   * This method generates a vector for the input query and performs a similarity search
   * against the embeddings in the repository. It filters and maps the results to documents
   * or documents with scores, depending on the retrieval model configuration.
   *
   * @param {string} datasetId - The ID of the dataset to search within.
   * @param {SimilaritySearchDto} similaritySearchDto - The query details for similarity search.
   * @returns {Promise<DocumentDto[] | [DocumentDto, number][]>} - A list of matching documents or documents with scores.
   */
  async similaritySearchVectorWithScore(
    datasetId: string,
    similaritySearchDto: SimilaritySearchDto,
  ): Promise<DocumentDto[] | [DocumentDto, number][]> {
    let { retrievalModel } = similaritySearchDto;

    // Fallback to dataset's default retrieval model if none is provided
    if (isEmpty(retrievalModel)) {
      const dataset = await this.datasetRepository.findDatasetById(datasetId);
      retrievalModel = dataset.retrievalModel as unknown as RetrievalModelDto;
    }

    const { topK, scoreThreshold, scoreThresholdEnabled } = retrievalModel;

    // Initialize the embedding instance with OpenAI API configuration
    const embeddingInstance = initEmbeddings();

    // Generate a vector for the input query using the embedding instance
    const vector = await embeddingInstance.embedQuery(similaritySearchDto.query);

    console.log(generateVectorClassPrefixByDatasetId(datasetId));

    // Perform similarity search in the embedding repository
    const embeddings = await this.embeddingRepository.similaritySearchVectorWithScore(
      vector,
      generateVectorClassPrefixByDatasetId(datasetId),
      topK,
      scoreThresholdEnabled ? scoreThreshold : undefined, // Optional score threshold for filtering results
    );

    // Map the embedding metadata to document objects
    const documents = embeddings.map((embeddingMetadata) => {
      const { content, answer, docForm, _distance, ...metadata } = embeddingMetadata;

      const document = new Document({
        pageContent: docForm === IndexType.Paragraph ? content : answer,
        metadata,
      });

      // If score threshold is enabled, return the document with its distance score
      if (scoreThresholdEnabled) {
        return [document, _distance];
      }

      return document;
    }) as DocumentDto[] | [DocumentDto, number][];

    // Update hit count for the matched document segments by dataset ID and hashes
    await this.documentSegmentRepository.updateManyHitCountByDatasetIdAndHashes(
      embeddings.map((item) => item.hash),
      datasetId,
    );

    return documents;
  }

  /**
   * Handles the RAG (Retrieval-Augmented Generation) process.
   *
   * This method retrieves documents based on similarity search results,
   * builds the context from the retrieved documents, and streams a response
   * using a large language model with a pre-configured prompt chain.
   *
   * @param {string} datasetId - The dataset ID.
   * @param {ConversationDto} conversationDto - The conversation details.
   * @param {string} [fallbackMessage] - A fallback message for unknown cases.
   * @returns {Promise<Observable<Record<string, string>>>} - An observable that streams the generated response.
   */
  async RAG(
    datasetId: string,
    conversationDto: ConversationDto,
    fallbackMessage?: string,
  ): Promise<Observable<Record<string, string>>> {
    const { messages } = conversationDto;

    // Extract query from the first message
    const query = messages[0].content.parts[0];

    // Perform similarity search and retrieve relevant documents
    const documents = await this.similaritySearchVectorWithScore(datasetId, {
      query,
    });

    //  Build the context from the retrieved documents
    const context = documents.map((document) => document.pageContent).join('\n\n');

    // Construct the chat history, with a default message if no history exists
    let chat_history = 'No chat history available';
    if (!isEmpty(messages)) {
      chat_history = messages.map((item) => `${item.author.role}: ${item.content.parts[0]}`).join('\n');
    }

    // Create a processing chain with the RAG prompt and a string output parser
    const chain = RAGChatHistoryPrompt.pipe(
      initModels({ model: LanguageModels[LLMProvider.OpenAI].GPT_4_O, streaming: true }),
    ).pipe(new StringOutputParser());

    // Stream the RAG-generated response
    const stream = await chain.stream({
      context,
      question: query,
      chat_history,
      fallbackMessage: fallbackMessage || `you don't know`,
    });

    // Return an observable for streaming the response
    return new Observable((subscriber) => {
      (async () => {
        // Stream chunks of data as they are generated
        for await (const chunk of stream) {
          subscriber.next({
            data: JSON.stringify({
              content: chunk,
            }),
          });
        }
        // Send a final completion marker
        subscriber.next({ data: STREAMING_RESPONSE_END_MARKER });
        setTimeout(() => subscriber.complete(), 100); // Ensure graceful termination
      })();
    });
  }
}
