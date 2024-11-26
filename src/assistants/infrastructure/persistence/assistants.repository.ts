import { LeekAssistant } from '../../domain/assistants';

/**
 * 抽象的 Assistant 仓库接口。
 * 提供创建、查询、更新和删除助手的方法。
 */
export abstract class AssistantRepository {
  /**
   * 创建一个新的助手。
   * @param data - 助手的数据，不包括 `id` 和 `createdAt`。
   * @param prisma - 可选的 Prisma 客户端用于事务。
   * @returns 创建的助手。
   *
   * 动作: create
   * 目标: Rule
   * 条件: 无
   */
  abstract createAssistant(data: Omit<LeekAssistant, 'id' | 'createdAt' | 'updatedAt'>): Promise<LeekAssistant>;

  /**
   * 根据规则 ID 查询单个助手。
   * @param id - 助手的 ID。
   * @returns 找到的助手或 null。
   *
   * 动作: find
   * 目标: Rule
   * 条件: ById
   */
  abstract findAssistantById(id: string): Promise<LEEK.Nullable<LeekAssistant>>;

  /**
   * 根据规则 ID 更新助手。
   * @param id - 助手的 ID。
   * @param payload - 包含部分更新数据的对象。
   *
   * 动作: update
   * 目标: Rule
   * 条件: ById
   */
  abstract updateAssistantById(id: string, payload: Partial<LeekAssistant>): Promise<void>;

  /**
   * 根据规则 ID 删除助手。
   * @param id - 助手的 ID。
   *
   * 动作: delete
   * 目标: Rule
   * 条件: ById
   */
  abstract deleteAssistantById(id: string): Promise<void>;
}
