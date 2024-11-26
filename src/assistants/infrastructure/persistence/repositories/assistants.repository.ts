import { Injectable } from '@nestjs/common';

import { PrismaService } from '@leek/prisma';

import { LeekAssistant } from '../../../domain/assistants';
import { AssistantRepository } from '../assistants.repository';
import { AssistantMapper } from '../mappers/assistants.mapper';

@Injectable()
export class AssistantRelationalRepository implements AssistantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 创建助手
   *
   * @param {Assistant} data - 领域实体
   * @returns {Promise<Assistant>} - 创建的助手领域实体
   */
  async createAssistant(data: LeekAssistant): Promise<LeekAssistant> {
    const assistant = await this.prismaService.assistant.create({
      data: AssistantMapper.toPersistence(data),
    });

    return AssistantMapper.toDomain(assistant);
  }

  /**
   * 获取所有助手
   *
   * @returns {Promise<Assistant[]>} - 助手领域实体数组
   */
  async findManyAssistants(): Promise<LeekAssistant[]> {
    const assistants = await this.prismaService.assistant.findMany();
    return assistants.map(AssistantMapper.toDomain);
  }

  /**
   * 根据 ID 查询助手
   *
   * @param {string} id - 助手 ID
   * @returns {Promise<Assistant | null>} - 匹配的助手或 `null`
   */
  async findAssistantById(id: string): Promise<LeekAssistant | null> {
    const entity = await this.prismaService.assistant.findUnique({
      where: { id },
    });

    return entity ? AssistantMapper.toDomain(entity) : null;
  }

  /**
   * 更新助手
   *
   * @param {string} id - 助手 ID
   * @param {Assistant} payload - 要更新的数据
   * @returns {Promise<void>}
   */
  async updateAssistantById(id: string, payload: LeekAssistant): Promise<void> {
    await this.prismaService.assistant.update({
      where: { id },
      data: AssistantMapper.toPersistence(payload),
    });
  }

  /**
   * 删除助手
   *
   * @param {string} id - 助手 ID
   * @returns {Promise<void>}
   */
  async deleteAssistantById(id: string): Promise<void> {
    await this.prismaService.assistant.delete({
      where: { id },
    });
  }
}
