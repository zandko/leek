import { Injectable } from '@nestjs/common';

import { PrismaService } from '@leek/prisma';

import { LeekDataset } from '../../../domain/dataset';
import { DatasetRepository } from '../dataset.repository';
import { DatasetMapper } from '../mappers/dataset.mapper';

@Injectable()
export class DatasetRelationalRepository implements DatasetRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createDataset(data: LeekDataset): Promise<LeekDataset> {
    const dataset = await this.prismaService.prisma.dataset.create({
      data: DatasetMapper.toPersistence(data),
    });

    return DatasetMapper.toDomain(dataset);
  }

  async findManyDatasets(): Promise<LeekDataset[]> {
    return this.prismaService.prisma.dataset?.findMany();
  }

  async findDatasetById(id: string): Promise<LEEK.Nullable<LeekDataset>> {
    const entity = await this.prismaService.prisma.dataset.findUnique({
      where: { id },
    });

    return entity ? DatasetMapper.toDomain(entity) : null;
  }

  async updateDatasetById(id: string, data: LeekDataset): Promise<void> {
    await this.prismaService.prisma.dataset.update({
      where: { id },
      data: DatasetMapper.toPersistence(data),
    });
  }

  async deleteDatasetById(id: string): Promise<void> {
    await this.prismaService.prisma.dataset.delete({
      where: { id },
    });
  }
}
