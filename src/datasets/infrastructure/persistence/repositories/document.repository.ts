import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PaginatedResult, QueryParams } from '@leek/interfaces';
import { PrismaService } from '@leek/prisma';
import { createPaginatedQuery } from '@leek/utils';

import { LeekDocument } from '../../../domain/document';
import { DocumentRepository } from '../document.repository';
import { DocumentMapper } from '../mappers/document.mapper';

@Injectable()
export class DocumentRelationalRepository implements DocumentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createDocument(data: LeekDocument): Promise<LeekDocument> {
    const document = await this.prismaService.prisma.document.create({
      data: DocumentMapper.toPersistence(data),
    });

    return DocumentMapper.toDomain(document);
  }

  async findManyDocumentsPaginatedByDatasetId(
    datasetId: string,
    queryParams: QueryParams<LeekDocument>,
  ): Promise<PaginatedResult<LeekDocument>> {
    const { currentPage, pageSize, q, createdFrom, enabled, archived, docForm } = queryParams;

    const where: Prisma.DocumentWhereInput = {
      datasetId,
      createdFrom,
      enabled,
      archived,
      docForm,
      OR: q ? [{ name: { contains: q, mode: 'insensitive' } }] : undefined,
    };

    const orderBy: Prisma.DocumentOrderByWithRelationInput = {
      position: 'desc',
    };

    const paginatedQuery = createPaginatedQuery<
      LeekDocument,
      Prisma.DocumentWhereInput,
      Prisma.DocumentOrderByWithRelationInput
    >(this.prismaService.prisma.document);

    return paginatedQuery({
      where,
      orderBy,
      currentPage,
      pageSize,
    });
  }

  async findDocumentById(id: string): Promise<LEEK.Nullable<LeekDocument>> {
    const entity = await this.prismaService.prisma.document.findUnique({
      where: { id },
    });
    return entity ? DocumentMapper.toDomain(entity) : null;
  }

  async findDocumentByNameAndDatasetId(name: string, datasetId: string): Promise<LEEK.Nullable<LeekDocument>> {
    return this.prismaService.prisma.document.findFirst({
      where: {
        name,
        datasetId,
      },
    });
  }

  async updateDocumentById(id: string, payload: LeekDocument): Promise<void> {
    await this.prismaService.prisma.document.update({
      where: { id },
      data: DocumentMapper.toPersistence(payload),
    });
  }

  async updateWordCountAndTokensById(id: string, wordCountDelta: number, tokensDelta: number): Promise<void> {
    await this.prismaService.prisma.document.update({
      where: { id },
      data: DocumentMapper.toPersistence({ wordCount: wordCountDelta, tokens: tokensDelta } as LeekDocument),
    });
  }

  async deleteDocumentById(id: string): Promise<void> {
    await this.prismaService.prisma.document.delete({
      where: { id },
    });
  }

  async deleteManyDocumentsByDatasetId(datasetId: string): Promise<void> {
    await this.prismaService.prisma.document.deleteMany({
      where: { datasetId },
    });
  }

  async countDocumentsByDatasetId(datasetId: string): Promise<number> {
    return this.prismaService.prisma.document.count({
      where: { datasetId },
    });
  }

  async renameDocumentById(id: string, name: string): Promise<LeekDocument> {
    return this.prismaService.prisma.document.update({
      where: { id },
      data: DocumentMapper.toPersistence({ name } as LeekDocument),
    });
  }
}
