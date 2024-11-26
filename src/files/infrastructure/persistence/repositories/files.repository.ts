import { Injectable } from '@nestjs/common';

import { PrismaService } from '@leek/prisma';

import { LeekFile } from '../../../domain/files';
import { FilesRepository } from '../files.repository';
import { FilesMapper } from '../mappers/files.mapper';

@Injectable()
export class FilesRelationalRepository implements FilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createFile(data: LeekFile): Promise<LeekFile> {
    const file = await this.prismaService.prisma.uploadFile.create({
      data: FilesMapper.toPersistence(data),
    });
    return FilesMapper.toDomain(file);
  }

  async findFileByHash(hash: string): Promise<LEEK.Nullable<LeekFile>> {
    const entity = await this.prismaService.prisma.uploadFile.findFirst({
      where: { hash },
    });
    return entity ? FilesMapper.toDomain(entity) : null;
  }

  async findFileById(id: LeekFile['id']): Promise<LeekFile> {
    const entity = await this.prismaService.prisma.uploadFile.findUnique({
      where: { id },
    });

    return entity ? FilesMapper.toDomain(entity) : null;
  }

  async updateFileUsageStatusById(id: string, used: boolean, usedAt: Date): Promise<void> {
    await this.prismaService.prisma.uploadFile.update({
      where: { id },
      data: FilesMapper.toPersistence({ used, usedAt } as LeekFile),
    });
  }
}
