import { UploadFile as FileEntity } from '@prisma/client';

import { LeekFile } from '../../../domain/files';

export class FilesMapper {
  /**
   * Converts a raw database entity to a domain entity.
   *
   * Transforms the database representation (`FileEntity`) into the domain model (`LeekFile`),
   * ensuring that all fields are properly mapped.
   *
   * @param {FileEntity} raw - The raw database entity.
   * @returns {LeekFile} - The corresponding domain entity.
   */
  static toDomain(raw: FileEntity): LeekFile {
    const domainEntity = new LeekFile();

    domainEntity.id = raw.id;
    domainEntity.storageType = raw.storageType;
    domainEntity.key = raw.key;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.size = raw.size;
    domainEntity.extension = raw.extension;
    domainEntity.mimeType = raw.mimeType;
    domainEntity.used = raw.used;
    domainEntity.usedAt = raw.usedAt;
    domainEntity.hash = raw.hash;

    domainEntity.createdAt = raw.createdAt;

    return domainEntity;
  }

  /**
   * Converts a domain entity to a persistence entity.
   *
   * Maps the domain model (`LeekFile`) into the persistence representation (`FileEntity`)
   *
   * @param {LeekFile} domainEntity - The domain entity to transform.
   * @returns {FileEntity} - The persistence entity ready for storage.
   */
  static toPersistence(domainEntity: LeekFile): FileEntity {
    const persistenceEntity = {} as FileEntity;

    persistenceEntity.name = domainEntity.name;
    persistenceEntity.storageType = domainEntity.storageType;
    persistenceEntity.key = domainEntity.key;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.size = domainEntity.size;
    persistenceEntity.extension = domainEntity.extension;
    persistenceEntity.mimeType = domainEntity.mimeType;
    persistenceEntity.used = domainEntity.used;
    persistenceEntity.usedAt = domainEntity.usedAt;
    persistenceEntity.hash = domainEntity.hash;

    return persistenceEntity;
  }
}
