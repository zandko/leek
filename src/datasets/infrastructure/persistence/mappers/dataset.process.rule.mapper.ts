import { DatasetProcessRule } from '@prisma/client';

import { LeekDatasetProcessRule } from '../../../domain/dataset.process.rule';

export class DatasetProcessRuleMapper {
  /**
   * Converts a raw database entity to a domain entity.
   *
   * Transforms the database representation (`DatasetProcessRule`) into the domain model (`DatasetProcessRule`),
   * ensuring that all fields are properly mapped.
   *
   * @param {DataDatasetProcessRuleset} raw - The raw database entity.
   * @returns {LeekDatasetProcessRule} - The corresponding domain entity.
   */
  static toDomain(raw: DatasetProcessRule): LeekDatasetProcessRule {
    const domainEntity = new LeekDatasetProcessRule();

    domainEntity.id = raw.id;
    domainEntity.datasetId = raw.id;
    domainEntity.mode = raw.mode;
    domainEntity.rules = raw.mode;

    domainEntity.createdAt = raw.createdAt;

    return domainEntity;
  }

  /**
   * Converts a domain entity to a persistence entity.
   *
   * Maps the domain model (`LeekDatasetProcessRule`) into the persistence representation (`DatasetProcessRule`)
   *
   * @param {LeekDatasetProcessRule} domainEntity - The domain entity to transform.
   * @returns {DatasetProcessRule} - The persistence entity ready for storage.
   */
  static toPersistence(domainEntity: LeekDatasetProcessRule): DatasetProcessRule {
    const persistenceEntity = {} as DatasetProcessRule;

    persistenceEntity.datasetId = domainEntity.datasetId;
    persistenceEntity.mode = domainEntity.mode;
    persistenceEntity.rules = domainEntity.rules;

    return persistenceEntity;
  }
}
