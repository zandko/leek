import { Injectable } from '@nestjs/common';

import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { Observable } from 'rxjs';

import { ConfigureAdapter } from '@leek/configure';
import { DatasetRepository } from '@leek/datasets/infrastructure/persistence/dataset.repository';
import { RetrievalService } from '@leek/datasets/services/retrieval.service';
import { createTokenCompletion, createEndCompletion } from '@leek/utils';

import { LeekAssistant } from './domain/assistants';
import { ConversationDto } from './dto/conversation.dto';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateAssistantDto } from './dto/update-assistant.dto';
import { AssistantRepository } from './infrastructure/persistence/assistants.repository';

@Injectable()
export class AssistantService {
  constructor(
    private readonly configureService: ConfigureAdapter,
    private readonly assistantRepository: AssistantRepository,
    private readonly datasetRepository: DatasetRepository,
    private readonly retrievalService: RetrievalService,
  ) {}

  /**
   * 创建新的助手
   *
   * 根据提供的 DTO 创建新的助手记录。
   *
   * @param {CreateAssistantDto} createAssistantDto - 助手创建所需的信息
   * @returns {Promise<Assistant>} - 创建成功的助手对象
   */
  async createAssistant(createAssistantDto: CreateAssistantDto): Promise<LeekAssistant> {
    return this.assistantRepository.createAssistant(createAssistantDto);
  }

  /**
   * 获取所有助手
   *
   * 检索数据库中存储的所有助手。
   *
   * @returns {Promise<Assistant[]>} - 助手对象的数组
   */
  // async findManyAssistants(): Promise<LeekAssistant[]> {
  //   return this.assistantRepository.findManyAssistants();
  // }

  /**
   * 根据 ID 获取助手
   *
   * 通过 ID 查询单个助手，如果不存在则返回 `null`。
   *
   * @param {Assistant['id']} id - 助手的唯一标识符
   * @returns {Promise<Assistant | null>} - 返回匹配的助手或 `null`
   */
  async findAssistantById(id: string): Promise<LeekAssistant | null> {
    return this.assistantRepository.findAssistantById(id);
  }

  /**
   * 更新助手
   *
   * 根据提供的更新信息更新指定 ID 的助手记录。
   *
   * @param {Assistant['id']} id - 助手的唯一标识符
   * @param {UpdateAssistantDto} updateAssistantDto - 包含更新数据的 DTO
   * @returns {Promise<void>} - 操作完成时返回
   */
  async updateAssistantById(id: string, updateAssistantDto: UpdateAssistantDto): Promise<void> {
    await this.assistantRepository.updateAssistantById(id, updateAssistantDto);
  }

  /**
   * 删除助手及其相关数据
   *
   * 删除助手及其可能关联的数据，操作在事务中完成。
   *
   * @param {Assistant['id']} id - 助手的唯一标识符
   * @returns {Promise<void>} - 操作完成时返回
   */
  async deleteAssistantById(id: string): Promise<void> {
    await this.assistantRepository.deleteAssistantById(id);
  }

  async conversation(id: string, conversationDto: ConversationDto) {
    const { messages } = conversationDto;
    const assistant = await this.assistantRepository.findAssistantById(id);
    const datasets = await this.datasetRepository.findDatasetById(assistant.datasetId);
    const query = messages[0].content.parts[0];
    const documents = await this.retrievalService.similaritySearchVectorWithScore(datasets.id, {
      query,
    });

    const context = documents.map((document) => document.pageContent).join('\n-----------\n');

    const assistantPrompt = ChatPromptTemplate.fromMessages([
      ['system', assistant.systemPrompt],
      ['human', '{input}'],
    ]);

    const chain = assistantPrompt.pipe(
      new ChatOpenAI({
        model: 'gpt-4o',
        temperature: 0.01,
        streaming: true,
        apiKey: this.configureService.OPENAI.API_KEY,
        configuration: {
          baseURL: this.configureService.OPENAI.BASE_URL,
        },
      }),
    );
    const stream = await chain.stream({
      context,
      input: query,
    });

    return new Observable((subscriber) => {
      (async () => {
        // Stream chunks of data as they are generated
        for await (const chunk of stream) {
          subscriber.next(createTokenCompletion({ parts: [chunk.content] }));
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
