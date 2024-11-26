import { DocumentSegment } from '@prisma/client';

import { LeekSegment } from '../../../domain/segment';

export class DocumentSegmentMapper {
  /**
   * Converts a raw database entity to a domain entity.
   *
   * Transforms the database representation (`DocumentSegment`) into the domain model (`LeekSegment`),
   * ensuring that all fields are properly mapped.
   *
   * @param {DocumentSegment} raw - The raw database entity.
   * @returns {LeekSegment} - The corresponding domain entity.
   */
  static toDomain(raw: DocumentSegment): LeekSegment {
    const domainEntity = new LeekSegment();

    domainEntity.id = raw.id;
    domainEntity.datasetId = raw.datasetId;
    domainEntity.documentId = raw.documentId;
    domainEntity.position = raw.position;
    domainEntity.content = raw.content;
    domainEntity.wordCount = raw.wordCount;
    domainEntity.tokens = raw.tokens;
    domainEntity.keywords = raw.keywords;
    domainEntity.indexNodeId = raw.indexNodeId;
    domainEntity.indexNodeHash = raw.indexNodeHash;
    domainEntity.hitCount = raw.hitCount;
    domainEntity.enabled = raw.enabled;
    domainEntity.disabledAt = raw.disabledAt;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.answer = raw.answer;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  /**
   * Converts a domain entity to a persistence entity.
   *
   * Maps the domain model (`LeekSegment`) into the persistence representation (`DocumentSegment`)
   *
   * @param {LeekSegment} domainEntity - The domain entity to transform.
   * @returns {DocumentSegment} - The persistence entity ready for storage.
   */
  static toPersistence(domainEntity: LeekSegment): DocumentSegment {
    const persistenceEntity = {} as DocumentSegment;

    persistenceEntity.datasetId = domainEntity.datasetId;
    persistenceEntity.documentId = domainEntity.documentId;
    persistenceEntity.position = domainEntity.position;
    persistenceEntity.content = domainEntity.content;
    persistenceEntity.wordCount = domainEntity.wordCount;
    persistenceEntity.tokens = domainEntity.tokens;
    persistenceEntity.keywords = domainEntity.keywords;
    persistenceEntity.indexNodeId = domainEntity.indexNodeId;
    persistenceEntity.indexNodeHash = domainEntity.indexNodeHash;
    persistenceEntity.hitCount = domainEntity.hitCount;
    persistenceEntity.enabled = domainEntity.enabled;
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.error = domainEntity.error;
    persistenceEntity.disabledAt = domainEntity.disabledAt;
    persistenceEntity.answer = domainEntity.answer;

    return persistenceEntity;
  }
}
