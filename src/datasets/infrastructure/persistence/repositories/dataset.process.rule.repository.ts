import { Injectable } from '@nestjs/common';

import { PrismaService } from '@leek/prisma';

import { LeekDatasetProcessRule } from '../../../domain/dataset.process.rule';
import { DatasetProcessRuleRepository } from '../dataset.process.rule.repository';
import { DatasetProcessRuleMapper } from '../mappers/dataset.process.rule.mapper';

@Injectable()
export class DatasetProcessRuleRelationalRepository implements DatasetProcessRuleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createRule(data: LeekDatasetProcessRule): Promise<LeekDatasetProcessRule> {
    const datasetProcessRule = await this.prismaService.prisma.datasetProcessRule.create({
      data: DatasetProcessRuleMapper.toPersistence(data),
    });

    return DatasetProcessRuleMapper.toDomain(datasetProcessRule);
  }

  async findRuleById(id: string): Promise<LEEK.Nullable<LeekDatasetProcessRule>> {
    const entity = await this.prismaService.prisma.datasetProcessRule.findUnique({
      where: { id },
    });
    return entity ? DatasetProcessRuleMapper.toDomain(entity) : null;
  }

  async findRuleByDatasetId(datasetId: string): Promise<LEEK.Nullable<LeekDatasetProcessRule>> {
    const entity = await this.prismaService.prisma.datasetProcessRule.findFirst({
      where: { datasetId },
    });
    return entity ? DatasetProcessRuleMapper.toDomain(entity) : null;
  }

  async updateRuleById(id: string, payload: LeekDatasetProcessRule): Promise<void> {
    await this.prismaService.prisma.datasetProcessRule.update({
      where: { id },
      data: DatasetProcessRuleMapper.toPersistence(payload),
    });
  }

  async deleteRuleById(id: string): Promise<void> {
    await this.prismaService.prisma.datasetProcessRule.delete({
      where: { id },
    });
  }

  async deleteRulesByDatasetId(datasetId: string): Promise<void> {
    await this.prismaService.prisma.datasetProcessRule.deleteMany({
      where: { datasetId },
    });
  }
}
