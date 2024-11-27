import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { Document } from '@langchain/core/documents';

import { Transactional } from '@leek/common';
import { ConfigureAdapter } from '@leek/configure';
import { CreationType, SegmentationType } from '@leek/constants';
import { LeekFile } from '@leek/files/domain/files';
import { PaginatedResult } from '@leek/interfaces';
import { initEmbeddings } from '@leek/langchain';
import { TransactionManager } from '@leek/prisma';
import { calculateIndexingLatency, filterUnique, uuid } from '@leek/utils';

import { JiebaKeywordService } from './jieba.keyword.service';
import { ProcessDocumentService } from './process.document.service';
import { FilesService } from '../../files/files.service';
import { FilesRepository } from '../../files/infrastructure/persistence/files.repository';
import { LeekDatasetProcessRule } from '../domain/dataset.process.rule';
import { LeekDocument } from '../domain/document';
import { LeekEmbedding } from '../domain/embedding';
import { LeekSegment } from '../domain/segment';
import { CreateDocumentByFileDto } from '../dto/create.document.by.file.dto';
import { CreateDocumentByTextDto } from '../dto/create.document.by.text.dto';
import { ProcessRuleDto } from '../dto/process.rule.dto';
import { QueryDocumentDto } from '../dto/query.document.dto';
import { UpdateDocumentNameDto } from '../dto/update.document.name.dto';
import { DatasetProcessRuleRepository } from '../infrastructure/persistence/dataset.process.rule.repository';
import { DocumentRepository } from '../infrastructure/persistence/document.repository';
import { DocumentSegmentRepository } from '../infrastructure/persistence/document.segment.repository';
import { EmbeddingRepository } from '../infrastructure/persistence/embedding.repository';
import { calculateStatisticsForDocuments } from '../shared/utils/calculate.statistics.util';
import { generateVectorClassPrefixByDatasetId } from '../shared/utils/generate.vector.class.prefix.by.dataset.id.util';

@Injectable()
export class DocumentService {
  private readonly logger = new Logger(DocumentService.name);

  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly documentSegmentRepository: DocumentSegmentRepository,
    private readonly datasetProcessRuleRepository: DatasetProcessRuleRepository,
    private readonly embeddingRepository: EmbeddingRepository,
    private readonly filesRepository: FilesRepository,
    private readonly filesService: FilesService,
    private readonly processDocumentService: ProcessDocumentService,
    private readonly jiebaKeywordService: JiebaKeywordService,
    private readonly configureService: ConfigureAdapter,
    private readonly transactionManager: TransactionManager,
  ) {}

  /**
   * Creates a document based on provided text content.
   *
   * Uploads the provided text content as a file and processes it to generate
   * document segments and embeddings.
   *
   * @param {CreateDocumentByTextDto} createDocumentByTextDto - DTO containing text content and processing rules.
   * @param {string} datasetId - The target dataset ID.
   * @param {CreationType} source - The source of the document (e.g., user-uploaded, system-generated).
   * @returns {Promise<LeekDocument>} - The created document object.
   */
  async createDocumentByText(
    createDocumentByTextDto: CreateDocumentByTextDto,
    datasetId: string,
    source: CreationType,
  ): Promise<LeekDocument> {
    const { name, text, processRule } = createDocumentByTextDto;

    // Upload the text as a file
    const file = await this.filesService.uploadTextFile(name, text);

    // Reuse the file-based document creation logic
    return this.createDocumentByFile(
      {
        originalDocumentId: file.id,
        processRule,
      },
      datasetId,
      source,
    );
  }

  /**
   * Creates a document based on a provided file.
   *
   * Validates and processes the file to generate document segments and embeddings,
   * and updates associated document metadata.
   *
   * @param {CreateDocumentByFileDto} createDocumentByFileDto - DTO containing file ID and processing rules.
   * @param {string} datasetId - The target dataset ID.
   * @param {CreationType} source - The source of the document (e.g., user-uploaded, system-generated).
   * @returns {Promise<LeekDocument>} - The created document object.
   */
  @Transactional({ timeout: 1000 * 60 * 3 })
  async createDocumentByFile(
    createDocumentByFileDto: CreateDocumentByFileDto,
    datasetId: string,
    source: CreationType,
  ): Promise<LeekDocument> {
    const { originalDocumentId, docForm, docLanguage, processRule } = createDocumentByFileDto;

    // Step 1: Validate the file and ensure no duplicates exist
    const file = await this.validateFileByIdAndDataset(originalDocumentId, datasetId);

    // Extract file details
    const { id: fileId, key: fileKey } = file;

    // Step 2: Process the document segments based on the dataset and provided rules
    const { processedDocuments, processedRule } = await this.processSegmentsByDataset(
      fileKey,
      docForm,
      docLanguage,
      processRule,
      datasetId,
    );

    // Step 3: Calculate statistics and determine indexing latency
    const { totalWordCount, totalTokens, tokensPerSegment } = await calculateStatisticsForDocuments(processedDocuments);
    const indexingLatency = calculateIndexingLatency(processedDocuments.length);

    // Step 4: Determine the document's position in the dataset
    const maxPosition = await this.documentRepository.countDocumentsByDatasetId(datasetId);

    try {
      let datasetProcessRule: LeekDatasetProcessRule;

      // Step 5: Save processing rules if applicable
      if (processedRule.mode === SegmentationType.Custom) {
        const rules = JSON.stringify({
          preProcessingRules: processedRule.preProcessingRules,
          segmentation: processedRule.segmentation,
        });
        datasetProcessRule = await this.datasetProcessRuleRepository.createRule(
          new LeekDatasetProcessRule({ datasetId, mode: processedRule.mode, rules }),
        );
      }

      // Step 6: Create the document entity in the database
      const document = await this.documentRepository.createDocument(
        new LeekDocument({
          datasetId,
          position: maxPosition ? maxPosition + 1 : 1,
          dataSourceInfo: { uploadFileId: fileId },
          datasetProcessRuleId: datasetProcessRule?.id,
          name: file.name,
          createdFrom: source,
          fileId,
          wordCount: totalWordCount,
          tokens: totalTokens,
          indexingLatency,
          docType: file.extension,
          docForm,
          docLanguage,
        }),
      );
      // Step 7: Prepare document segments and filter for uniqueness
      const segments = this.prepareSegmentsByDatasetAndDocument(
        processedDocuments,
        tokensPerSegment,
        datasetId,
        document.id,
      );

      const uniqueSegments = filterUnique(segments, 'indexNodeHash');

      // Batch insert unique segments into the repository
      await this.documentSegmentRepository.createManySegments(uniqueSegments);
      // Step 8: Prepare and register embeddings
      const embeddings = await this.prepareEmbeddingsByDataset(processedDocuments, datasetId);
      await this.embeddingRepository.registerEmbeddings(embeddings);
      // Step 9: Mark the file as used
      await this.filesRepository.updateFileUsageStatusById(fileId, true, new Date());
      return document;
    } catch (error) {
      this.logger.error('Error creating document. Rolling back transaction.', error.stack);
      throw new InternalServerErrorException('Error processing document. Please try again later.');
    }
  }

  /**
   * Validates a file's existence and ensures it is not duplicated in the dataset.
   *
   * @param {string} fileId - The ID of the file to validate.
   * @param {string} datasetId - The ID of the target dataset.
   * @returns {Promise<LeekFile>} - The validated file object.
   * @throws {BadRequestException} - If the file is not found or is duplicated.
   */
  private async validateFileByIdAndDataset(fileId: string, datasetId: string): Promise<LeekFile> {
    const storedFile = await this.filesRepository.findFileById(fileId);
    if (!storedFile) {
      throw new BadRequestException(`File with ID "${fileId}" not found.`);
    }

    const storedDocument = await this.documentRepository.findDocumentByNameAndDatasetId(storedFile.name, datasetId);
    if (storedDocument) {
      throw new BadRequestException(`Document "${storedFile.name}" already exists in dataset "${datasetId}".`);
    }
    return storedFile;
  }

  /**
   * Processes document segments and filters duplicates based on hashes.
   *
   * @param {string} fileKey - The key of the file to process.
   * @param {string} docForm - The document form (e.g., QA, raw text).
   * @param {string} docLanguage - The document language.
   * @param {ProcessRuleDto} processRule - Processing rules for segmentation.
   * @param {string} datasetId - The ID of the target dataset.
   * @returns {Promise<{ processedDocuments: Document[]; processedRule: ProcessRuleDto }>} - Processed segments and rules.
   */
  private async processSegmentsByDataset(
    fileKey: string,
    docForm: string,
    docLanguage: string,
    processRule: ProcessRuleDto,
    datasetId: string,
  ): Promise<{ processedDocuments: Document[]; processedRule: ProcessRuleDto }> {
    // Step 1: Process documents with provided rules
    const { processedDocuments, processedRule } = await this.processDocumentService.processDocumentsWithRules(
      fileKey,
      processRule,
      docForm,
      docLanguage,
    );

    // Step 2: Check for duplicates by matching hashes
    const storedHashes = await this.documentSegmentRepository.findManyHashesByDatasetIdAndHashes(
      processedDocuments.map((doc) => doc.metadata.hash),
      datasetId,
    );

    // Step 3: Filter out already existing segments
    const filteredDocuments = processedDocuments.filter((doc) => !storedHashes.includes(doc.metadata.hash));

    if (!filteredDocuments.length) {
      throw new BadRequestException(`All document segments already exist in dataset "${datasetId}".`);
    }

    return { processedDocuments: filteredDocuments, processedRule };
  }

  /**
   * Prepares document segments for storage.
   *
   * This method processes raw document data and constructs segments
   * for storage in the database, including metadata such as keywords
   * and unique hashes.
   *
   * @param {Document[]} documents - The raw document objects.
   * @param {number[]} tokensPerSegment - Token counts for each segment.
   * @param {string} datasetId - The dataset ID.
   * @param {string} documentId - The document ID.
   * @returns {LeekSegment[]} - The array of prepared document segments.
   */
  private prepareSegmentsByDatasetAndDocument(
    documents: Document[],
    tokensPerSegment: number[],
    datasetId: string,
    documentId: string,
  ): LeekSegment[] {
    return documents.map((doc, index) => {
      // Generate metadata for each document segment
      const keywords = this.jiebaKeywordService.extractKeywordsWithSubtokens(doc.pageContent);
      const indexNodeHash = doc.metadata.hash;

      return new LeekSegment({
        datasetId,
        documentId,
        position: index + 1,
        content: doc.pageContent,
        wordCount: doc.pageContent.length,
        tokens: tokensPerSegment[index],
        keywords,
        indexNodeId: uuid(),
        indexNodeHash,
        answer: doc.metadata?.answer,
      });
    });
  }

  /**
   * Prepares embeddings for document segments.
   *
   * This method generates embeddings for each document's content and
   * associates them with unique identifiers and vector class prefixes.
   *
   * @param {Document[]} documents - The processed document objects.
   * @param {string} datasetId - The dataset ID.
   * @returns {Promise<LeekEmbedding[]>} - The array of prepared embeddings.
   */
  private async prepareEmbeddingsByDataset(documents: Document[], datasetId: string): Promise<LeekEmbedding[]> {
    const embeddingInstance = initEmbeddings();

    // Generate embeddings for all document contents
    const vectors = await embeddingInstance.embedDocuments(documents.map((doc) => doc.pageContent));

    return documents.map((doc, idx) => {
      const hash = doc.metadata.hash;
      const classPrefix = generateVectorClassPrefixByDatasetId(datasetId);

      return new LeekEmbedding({
        hash,
        classPrefix,
        embedding: vectors[idx],
      });
    });
  }

  /**
   * Retrieves paginated documents for a dataset.
   *
   * Fetches a list of documents associated with a specific dataset,
   * supporting pagination and filtering options.
   *
   * @param {string} datasetId - The dataset ID.
   * @param {QueryDocumentDto} queryDocumentDto - Pagination and filtering options.
   * @returns {Promise<PaginatedResult<LeekDocument>>} - The paginated document results.
   */
  async findManyDocumentsPaginatedByDatasetId(
    datasetId: string,
    queryDocumentDto: QueryDocumentDto,
  ): Promise<PaginatedResult<LeekDocument>> {
    return this.documentRepository.findManyDocumentsPaginatedByDatasetId(datasetId, queryDocumentDto);
  }

  /**
   * Finds a document by its ID.
   *
   * Fetches a single document based on its unique identifier.
   *
   * @param {string} documentId - The document ID.
   * @returns {Promise<LEEK.Nullable<LeekDocument>>} - The document or null if not found.
   */
  async findDocumentById(documentId: string): Promise<LEEK.Nullable<LeekDocument>> {
    return this.documentRepository.findDocumentById(documentId);
  }

  /**
   * Deletes a document and its associated data.
   *
   * Removes the specified document along with its related segments and embeddings.
   *
   * @param {string} datasetId - The dataset ID.
   * @param {string} documentId - The document ID.
   * @throws {InternalServerErrorException} - If an error occurs during deletion.
   */
  @Transactional()
  async deleteDocumentById(datasetId: string, documentId: string): Promise<void> {
    // Remove all embeddings related to the document
    await this.embeddingRepository.deleteManyEmbeddingsByClassPrefix(generateVectorClassPrefixByDatasetId(datasetId));
    // Remove all segments related to the document
    await this.documentSegmentRepository.deleteManySegmentsByDocumentId(documentId);
    // Remove the document itself
    await this.documentRepository.deleteDocumentById(documentId);
  }

  /**
   * Renames a document.
   *
   * Updates the name of an existing document based on its ID.
   *
   * @param {string} documentId - The document ID.
   * @param {UpdateDocumentNameDto} updateDocumentNameDto - DTO containing the new name.
   * @throws {InternalServerErrorException} - If an error occurs during renaming.
   */
  async renameDocumentById(documentId: string, updateDocumentNameDto: UpdateDocumentNameDto): Promise<void> {
    await this.documentRepository.renameDocumentById(documentId, updateDocumentNameDto.name);
  }

  /**
   * Disables a document.
   *
   * Marks the specified document as disabled in the system.
   *
   * @param {string} documentId - The document ID.
   * @throws {InternalServerErrorException} - If an error occurs during the operation.
   */
  async disableDocumentById(documentId: string): Promise<void> {
    await this.documentRepository.updateDocumentById(documentId, {
      enabled: false,
      disabledAt: new Date(),
    });
  }

  /**
   * Enables a document.
   *
   * Marks the specified document as enabled in the system.
   *
   * @param {string} documentId - The document ID.
   * @throws {InternalServerErrorException} - If an error occurs during the operation.
   */
  async enableDocumentById(documentId: string) {
    await this.documentRepository.updateDocumentById(documentId, {
      enabled: true,
    });
  }

  /**
   * Archives a document.
   *
   * Marks the specified document as archived.
   *
   * @param {string} documentId - The document ID.
   * @throws {InternalServerErrorException} - If an error occurs during the operation.
   */
  async archiveDocumentById(documentId: string) {
    await this.documentRepository.updateDocumentById(documentId, {
      archived: true,
      archivedAt: new Date(),
    });
  }

  /**
   * Unarchives a document.
   *
   * Restores a document from an archived state.
   *
   * @param {string} documentId - The document ID.
   * @throws {InternalServerErrorException} - If an error occurs during the operation.
   */
  async unArchiveDocumentById(documentId: string) {
    await this.documentRepository.updateDocumentById(documentId, {
      archived: false,
    });
  }
}
