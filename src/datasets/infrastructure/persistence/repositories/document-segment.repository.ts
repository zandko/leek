import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PaginatedResult, QueryParams } from '@leek/interfaces';
import { PrismaService } from '@leek/prisma';
import { createPaginatedQuery } from '@leek/utils';

import { LeekSegment } from '../../../domain/segment';
import { DocumentSegmentRepository } from '../document-segment.repository';
import { DocumentSegmentMapper } from '../mappers/document-segment.mapper';

@Injectable()
export class DocumentSegmentRelationalRepository implements DocumentSegmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createSegment(data: LeekSegment): Promise<LeekSegment> {
    const documentSegment = await this.prismaService.prisma.documentSegment.create({
      data: DocumentSegmentMapper.toPersistence(data),
    });

    return DocumentSegmentMapper.toDomain(documentSegment);
  }

  async createManySegments(data: LeekSegment[]): Promise<void> {
    await this.prismaService.prisma.documentSegment.createMany({
      data: data.map(DocumentSegmentMapper.toPersistence),
    });
  }

  async findManySegmentsPaginatedByDocumentId(
    documentId: string,
    queryParams: QueryParams<LeekSegment>,
  ): Promise<PaginatedResult<LeekSegment>> {
    const { currentPage, pageSize, q, enabled } = queryParams;

    const where: Prisma.DocumentSegmentWhereInput = {
      documentId,
      enabled,
      OR: q
        ? [{ content: { contains: q, mode: 'insensitive' } }, { answer: { contains: q, mode: 'insensitive' } }]
        : undefined,
    };

    const orderBy: Prisma.DocumentSegmentOrderByWithRelationInput = {
      position: 'desc',
    };

    const paginatedQuery = createPaginatedQuery<
      LeekSegment,
      Prisma.DocumentSegmentWhereInput,
      Prisma.DocumentSegmentOrderByWithRelationInput
    >(this.prismaService.prisma.documentSegment);

    return paginatedQuery({
      where,
      orderBy,
      currentPage,
      pageSize,
    });
  }

  async findSegmentById(id: string): Promise<LEEK.Nullable<LeekSegment>> {
    const entity = await this.prismaService.prisma.documentSegment.findUnique({
      where: { id },
    });

    return entity ? DocumentSegmentMapper.toDomain(entity) : null;
  }

  async findSegmentByDatasetDocumentAndHash(
    datasetId: string,
    documentId: string,
    indexNodeHash: string,
  ): Promise<LEEK.Nullable<LeekSegment>> {
    const entity = await this.prismaService.prisma.documentSegment.findFirst({
      where: { indexNodeHash, documentId, datasetId },
    });

    return entity ? DocumentSegmentMapper.toDomain(entity) : null;
  }

  async findManyHashesByDatasetIdAndHashes(hashes: string[], datasetId: string): Promise<string[]> {
    const result = await this.prismaService.prisma.documentSegment.findMany({
      where: {
        indexNodeHash: {
          in: hashes,
        },
        datasetId,
      },
      select: {
        indexNodeHash: true,
      },
    });
    return result.map((segment) => segment.indexNodeHash);
  }

  async updateSegmentById(id: string, payload: LeekSegment): Promise<void> {
    await this.prismaService.prisma.documentSegment.update({
      where: { id },
      data: DocumentSegmentMapper.toPersistence(payload),
    });
  }

  async updateManyHitCountByDatasetIdAndHashes(hashes: string[], datasetId: string) {
    await this.prismaService.prisma.documentSegment.updateMany({
      data: {
        hitCount: {
          increment: 1,
        },
      },
      where: {
        datasetId,
        indexNodeHash: {
          in: hashes,
        },
      },
    });
  }

  async deleteSegmentById(id: string): Promise<void> {
    await this.prismaService.prisma.documentSegment.delete({
      where: { id },
    });
  }

  async deleteManySegmentsByDocumentId(documentId: string): Promise<void> {
    await this.prismaService.prisma.documentSegment.deleteMany({
      where: { documentId },
    });
  }

  async deleteManySegmentsByDatasetId(datasetId: string): Promise<void> {
    await this.prismaService.prisma.documentSegment.deleteMany({
      where: { datasetId },
    });
  }

  async countSegmentsByDocumentId(documentId: string): Promise<number> {
    return this.prismaService.prisma.documentSegment.count({
      where: { documentId },
    });
  }
}
