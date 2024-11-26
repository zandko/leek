import { Assistant } from '@prisma/client';

import { LeekAssistant } from '../../../domain/assistants';

export class AssistantMapper {
  /**
   * 将数据库实体转换为领域实体
   *
   * @param {Assistant} raw - 数据库中的助手记录
   * @returns {LeekAssistant} - 领域实体
   */
  static toDomain(raw: Assistant): LeekAssistant {
    const domainEntity = new LeekAssistant();

    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.datasetId = raw.datasetId;
    domainEntity.systemPrompt = raw.systemPrompt;

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  /**
   * 将领域实体转换为数据库实体
   *
   * @param {LeekAssistant} domainEntity - 领域实体
   * @returns {Assistant} - 数据库实体
   */
  static toPersistence(domainEntity: LeekAssistant): Assistant {
    const persistenceEntity = {} as Assistant;

    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.datasetId = domainEntity.datasetId;
    persistenceEntity.systemPrompt = domainEntity.systemPrompt;

    return persistenceEntity;
  }
}
