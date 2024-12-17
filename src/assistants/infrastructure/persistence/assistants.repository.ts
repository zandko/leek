import { LeekAssistant } from '../../domain/assistants';

export abstract class AssistantRepository {
  abstract createAssistant(data: Omit<LeekAssistant, 'id' | 'createdAt' | 'updatedAt'>): Promise<LeekAssistant>;
  abstract findAssistantById(id: string): Promise<LEEK.Nullable<LeekAssistant>>;
  abstract findManyAssistants(): Promise<LeekAssistant[]>;
  abstract updateAssistantById(id: string, payload: Partial<LeekAssistant>): Promise<void>;
  abstract deleteAssistantById(id: string): Promise<void>;
}
