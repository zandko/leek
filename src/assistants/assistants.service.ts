import { Injectable } from '@nestjs/common';

import { BaseMessagePromptTemplateLike } from '@langchain/core/prompts';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { Observable } from 'rxjs';

import { ConversationMessageDto } from '@leek/assistants/dto/conversation.message.dto';
import { ConfigureAdapter } from '@leek/configure';
import { LanguageModels, LLMProvider, Role } from '@leek/constants';
import { DocumentDto } from '@leek/datasets/dto/document.dto';
import { DatasetRepository } from '@leek/datasets/infrastructure/persistence/dataset.repository';
import { RetrievalService } from '@leek/datasets/services/retrieval.service';
import { initModels } from '@leek/langchain';
import {
  createTokenCompletion,
  createEndCompletion,
  getCurrentFormattedTime,
  extractIntersectingKeys,
} from '@leek/utils';

import { LeekAssistant } from './domain/assistants';
import { ConversationDto } from './dto/conversation.dto';
import { CreateAssistantDto } from './dto/create.assistant.dto';
import { UpdateAssistantDto } from './dto/update.assistant.dto';
import { AssistantRepository } from './infrastructure/persistence/assistants.repository';

@Injectable()
export class AssistantService {
  constructor(
    private readonly configureService: ConfigureAdapter,
    private readonly assistantRepository: AssistantRepository,
    private readonly datasetRepository: DatasetRepository,
    private readonly retrievalService: RetrievalService,
  ) {}

  async createAssistant(createAssistantDto: CreateAssistantDto): Promise<LeekAssistant> {
    return this.assistantRepository.createAssistant(createAssistantDto);
  }

  async findManyAssistants(): Promise<LeekAssistant[]> {
    return this.assistantRepository.findManyAssistants();
  }

  async findAssistantById(id: string): Promise<LeekAssistant | null> {
    return this.assistantRepository.findAssistantById(id);
  }

  async updateAssistantById(id: string, updateAssistantDto: UpdateAssistantDto): Promise<void> {
    await this.assistantRepository.updateAssistantById(id, updateAssistantDto);
  }

  async deleteAssistantById(id: string): Promise<void> {
    await this.assistantRepository.deleteAssistantById(id);
  }

  async conversation(id: string, conversationDto: ConversationDto) {
    const { messages } = conversationDto;

    const assistant = await this.assistantRepository.findAssistantById(id);

    const presetMessages: BaseMessagePromptTemplateLike[] = (
      (assistant?.messages || []) as unknown as ConversationMessageDto[]
    ).map((message) => {
      return [message.author.role === Role.ASSISTANT ? 'ai' : 'human', message.content.parts[0]];
    });

    const lastMessage = presetMessages[presetMessages.length - 1];

    const query: string = messages?.[0]?.content?.parts?.[0];

    let context: string = '';

    if (assistant.datasetId) {
      const datasets = await this.datasetRepository.findDatasetById(assistant.datasetId);
      const documents = (await this.retrievalService.similaritySearchVectorWithScore(datasets.id, {
        query: query || lastMessage?.[1],
      })) as DocumentDto[];
      context = documents.map((document) => document.pageContent).join('\n-----------\n');
    }

    const assistantPrompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `${assistant.systemPrompt || ''}
${
  context
    ? `# Here is the context that you should use to answer the question:

{__context__}`
    : ''
}

Current date: ${getCurrentFormattedTime()}`,
      ],
      ...presetMessages,
      ...(query ? ['human', '{__input__}'] : []),
    ]);

    const chain = assistantPrompt.pipe(
      initModels({
        model: LanguageModels[LLMProvider.OpenAI].GPT_4_O,
        temperature: 0.01,
        streaming: !!conversationDto.streaming,
      }),
    );

    const chatParams = {
      __context__: context,
      __input__: query,
      ...(assistant.variables ? extractIntersectingKeys(conversationDto.variables, assistant.variables as object) : {}),
    };

    if (!conversationDto.streaming) {
      const response = await chain.invoke(chatParams);
      return { content: response.content };
    }

    const stream = await chain.stream(chatParams);

    return new Observable((subscriber) => {
      (async () => {
        // Stream chunks of data as they are generated
        for await (const chunk of stream) {
          subscriber.next(createTokenCompletion({ parts: [chunk.content as string] }));
        }
        // Send a final completion marker
        subscriber.next(createEndCompletion());
        setTimeout(() => {
          subscriber.complete();
        }, 100);
      })();
    });
  }
}
