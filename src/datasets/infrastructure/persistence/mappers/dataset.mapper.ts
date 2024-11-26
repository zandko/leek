import { Dataset } from '@prisma/client';

import { LeekDataset } from '../../../domain/dataset';

export class DatasetMapper {
  /**
   * Converts a raw database entity to a domain entity.
   *
   * Transforms the database representation (`Dataset`) into the domain model (`LeekDataset`),
   * ensuring that all fields are properly mapped.
   *
   * @param {Dataset} raw - The raw database entity.
   * @returns {LeekDataset} - The corresponding domain entity.
   */
  static toDomain(raw: Dataset): LeekDataset {
    const domainEntity = new LeekDataset();

    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.provider = raw.provider;
    domainEntity.dataSourceType = raw.dataSourceType;
    domainEntity.indexStruct = raw.indexStruct;
    domainEntity.embeddingModel = raw.embeddingModel;
    domainEntity.embeddingModelProvider = raw.embeddingModelProvider;
    domainEntity.retrievalModel = raw.retrievalModel;

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  /**
   * Converts a domain entity to a persistence entity.
   *
   * Maps the domain model (`LeekDataset`) into the persistence representation (`Dataset`)
   *
   * @param {LeekDataset} domainEntity - The domain entity to transform.
   * @returns {Dataset} - The persistence entity ready for storage.
   */
  static toPersistence(domainEntity: LeekDataset): Dataset {
    const persistenceEntity = {} as Dataset;

    persistenceEntity.id = domainEntity.id;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.dataSourceType = domainEntity.dataSourceType;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.indexStruct = domainEntity.indexStruct;
    persistenceEntity.embeddingModel = domainEntity.embeddingModel;
    persistenceEntity.embeddingModelProvider = domainEntity.embeddingModelProvider;
    persistenceEntity.retrievalModel = domainEntity.retrievalModel;

    return persistenceEntity;
  }
}
