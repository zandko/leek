import { Embeddings } from '@prisma/client';

import { LeekEmbedding } from '../../../domain/embedding';

export class EmbeddingMapper {
  static toDomain(raw: Embeddings): LeekEmbedding {
    const domainEntity = new LeekEmbedding();

    domainEntity.id = raw.id;
    domainEntity.classPrefix = raw.classPrefix;
    domainEntity.hash = raw.hash;
    domainEntity.modelName = raw.modelName;
    domainEntity.providerName = raw.providerName;

    domainEntity.createdAt = raw.createdAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: LeekEmbedding): Embeddings {
    const persistenceEntity = {} as Embeddings;

    persistenceEntity.classPrefix = domainEntity.classPrefix;
    persistenceEntity.hash = domainEntity.hash;
    persistenceEntity.modelName = domainEntity.modelName;
    persistenceEntity.providerName = domainEntity.providerName;

    return persistenceEntity;
  }
}
