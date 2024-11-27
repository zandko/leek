import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@leek/prisma';

import { LeekEmbedding } from '../../../domain/embedding';
import { EmbeddingWithMetadata } from '../../../shared/interfaces/embedding.with.metadata';
import { EmbeddingRepository } from '../embedding.repository';

@Injectable()
export class EmbeddingRelationalRepository implements EmbeddingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async registerEmbeddings(embeddings: LeekEmbedding[]): Promise<void> {
    const queries = embeddings.map((embedding) => {
      const vectorString = `[${embedding.embedding.join(',')}]`;
      return this.prismaService.prisma.$executeRaw(
        Prisma.sql`
          INSERT INTO "Embeddings" ("id", "classPrefix", "hash", "embedding", "modelName", "providerName")
          VALUES (${embedding.id}, ${embedding.classPrefix}, ${embedding.hash}, ${vectorString}::vector, ${embedding.modelName}, ${embedding.providerName})
          ON CONFLICT ("classPrefix", "hash")
          DO UPDATE SET "embedding" = EXCLUDED."embedding";
        `,
      );
    });
    await this.prismaService.prisma.$transaction(queries);
  }

  async updateEmbeddingsByHashAndClassPrefix(embeddings: LeekEmbedding[]): Promise<void> {
    const queries = embeddings.map((embedding) => {
      const vectorString = `[${embedding.embedding.join(',')}]`;
      return this.prismaService.prisma.$executeRaw(
        Prisma.sql`
          UPDATE "Embeddings"
          SET "embedding" = ${vectorString}::vector
          WHERE "classPrefix" = ${embedding.classPrefix}
            AND "hash" = ${embedding.hash};
        `,
      );
    });
    await this.prismaService.prisma.$transaction(queries);
  }

  async similaritySearchVectorWithScore(
    vector: number[],
    classPrefix: string,
    k: number,
    scoreThreshold?: number,
  ): Promise<EmbeddingWithMetadata[]> {
    const embeddings = await this.prismaService.prisma.$queryRaw<EmbeddingWithMetadata[]>`
SELECT e."hash",
       ds."content" AS "content", 
       ds."answer" AS "answer",
       ds."keywords" AS "keywords",
       ds."wordCount" AS "wordCount",
       ds."tokens" AS "tokens",
       d."docForm" as "docForm",
       1 - (e."embedding" <-> ${vector}::vector) AS "_distance"
FROM "Embeddings" e
JOIN "DocumentSegment" ds
  ON e."hash" = ds."indexNodeHash" AND e."classPrefix" = ${classPrefix}
JOIN "Document" d
  ON ds."documentId" = d."id"
WHERE e."classPrefix" = ${classPrefix}
  AND ds."enabled" = TRUE
  AND d."enabled" = TRUE
  AND d."archived" = FALSE
  ${scoreThreshold !== undefined ? Prisma.sql`AND 1 - (e."embedding" <-> ${vector}::vector) >= ${scoreThreshold}` : Prisma.sql``}
ORDER BY "_distance" DESC
LIMIT ${k};
`;
    return embeddings;
  }

  async deleteManyEmbeddingsByHashAndClassPrefix(hash: string, classPrefix: string): Promise<void> {
    await this.prismaService.prisma.embeddings.deleteMany({
      where: { hash, classPrefix },
    });
  }

  async deleteManyEmbeddingsByClassPrefix(classPrefix: string): Promise<void> {
    await this.prismaService.prisma.embeddings.deleteMany({
      where: { classPrefix },
    });
  }
}
