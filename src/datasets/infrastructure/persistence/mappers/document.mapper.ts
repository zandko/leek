import { Document } from '@prisma/client';

import { LeekDocument } from '../../../domain/document';

export class DocumentMapper {
  /**
   * Converts a raw database entity to a domain entity.
   *
   * Transforms the database representation (`Document`) into the domain model (`LeekDocument`),
   * ensuring that all fields are properly mapped.
   *
   * @param {Document} raw - The raw database entity.
   * @returns {LeekDocument} - The corresponding domain entity.
   */
  static toDomain(raw: Document): LeekDocument {
    const domainEntity = new LeekDocument();

    domainEntity.id = raw.id;
    domainEntity.datasetId = raw.datasetId;
    domainEntity.position = raw.position;
    domainEntity.dataSourceType = raw.dataSourceType;
    domainEntity.dataSourceInfo = raw.dataSourceInfo;
    domainEntity.datasetProcessRuleId = raw.datasetProcessRuleId;
    domainEntity.name = raw.name;
    domainEntity.createdFrom = raw.createdFrom;
    domainEntity.createdApiRequestId = raw.createdApiRequestId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.fileId = raw.fileId;
    domainEntity.wordCount = raw.wordCount;
    domainEntity.tokens = raw.tokens;
    domainEntity.indexingLatency = raw.indexingLatency;
    domainEntity.enabled = raw.enabled;
    domainEntity.disabledAt = raw.disabledAt;
    domainEntity.archived = raw.archived;
    domainEntity.archivedReason = raw.archivedReason;
    domainEntity.archivedAt = raw.archivedAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.docType = raw.docType;
    domainEntity.docMetadata = raw.docMetadata;
    domainEntity.docForm = raw.docForm;
    domainEntity.docLanguage = raw.docLanguage;

    return domainEntity;
  }

  /**
   * Converts a domain entity to a persistence entity.
   *
   * Maps the domain model (`LeekDocument`) into the persistence representation (`Document`)
   *
   * @param {LeekDocument} domainEntity - The domain entity to transform.
   * @returns {Document} - The persistence entity ready for storage.
   */
  static toPersistence(domainEntity: LeekDocument): Document {
    const persistenceEntity = {} as Document;

    persistenceEntity.datasetId = domainEntity.datasetId;
    persistenceEntity.position = domainEntity.position;
    persistenceEntity.dataSourceType = domainEntity.dataSourceType;
    persistenceEntity.dataSourceInfo = domainEntity.dataSourceInfo;
    persistenceEntity.datasetProcessRuleId = domainEntity.datasetProcessRuleId;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.createdFrom = domainEntity.createdFrom;
    persistenceEntity.createdApiRequestId = domainEntity.createdApiRequestId;

    persistenceEntity.wordCount = domainEntity.wordCount;
    persistenceEntity.tokens = domainEntity.tokens;
    persistenceEntity.indexingLatency = domainEntity.indexingLatency;
    persistenceEntity.enabled = domainEntity.enabled;
    persistenceEntity.disabledAt = domainEntity.disabledAt;
    persistenceEntity.archived = domainEntity.archived;
    persistenceEntity.archivedReason = domainEntity.archivedReason;
    persistenceEntity.archivedAt = domainEntity.archivedAt;
    persistenceEntity.docType = domainEntity.docType;
    persistenceEntity.docMetadata = domainEntity.docMetadata;
    persistenceEntity.docForm = domainEntity.docForm;
    persistenceEntity.docLanguage = domainEntity.docLanguage;
    persistenceEntity.fileId = domainEntity.fileId;

    return persistenceEntity;
  }
}
