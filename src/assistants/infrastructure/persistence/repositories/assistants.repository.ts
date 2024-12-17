import { Injectable } from '@nestjs/common';

import { PrismaService } from '@leek/prisma';

import { LeekAssistant } from '../../../domain/assistants';
import { AssistantRepository } from '../assistants.repository';
import { AssistantMapper } from '../mappers/assistants.mapper';

@Injectable()
export class AssistantRelationalRepository implements AssistantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createAssistant(data: LeekAssistant): Promise<LeekAssistant> {
    const assistant = await this.prismaService.assistant.create({
      data: AssistantMapper.toPersistence(data),
    });

    return AssistantMapper.toDomain(assistant);
  }

  async findManyAssistants(): Promise<LeekAssistant[]> {
    const assistants = await this.prismaService.assistant.findMany();
    return assistants.map(AssistantMapper.toDomain);
  }

  async findAssistantById(id: string): Promise<LeekAssistant | null> {
    const entity = await this.prismaService.assistant.findUnique({
      where: { id },
    });

    return entity ? AssistantMapper.toDomain(entity) : null;
  }

  async updateAssistantById(id: string, payload: LeekAssistant): Promise<void> {
    await this.prismaService.assistant.update({
      where: { id },
      data: AssistantMapper.toPersistence(payload),
    });
  }

  async deleteAssistantById(id: string): Promise<void> {
    await this.prismaService.assistant.delete({
      where: { id },
    });
  }
}
