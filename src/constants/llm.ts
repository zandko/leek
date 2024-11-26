/**
 * Enum for supported embedding providers.
 * These represent external services or platforms offering embedding models.
 */
export enum EmbeddingProvider {
  OpenAI = 'openai',
}

/**
 * Embedding models categorized by provider.
 * Provides a structured constant for easy access.
 */
export const EmbeddingModels = {
  [EmbeddingProvider.OpenAI]: {
    TEXT_EMBEDDING_3_SMALL: 'text-embedding-3-small',
    TEXT_EMBEDDING_3_LARGE: 'text-embedding-3-large',
  },
} as const;

/**
 * Enum for supported Large Language Model (LLM) providers.
 */
export enum LLMProvider {
  OpenAI = 'OpenAI',
  Qianfan = 'Qianfan',
}

/**
 * Language models categorized by provider.
 * Provides a structured constant for easy access.
 */
export const LanguageModels = {
  [LLMProvider.OpenAI]: {
    GPT_4_O: 'gpt-4o',
    GPT_4_O_MINI: 'gpt-4o-mini',
  },
  [LLMProvider.Qianfan]: {
    ERNIE_BOT: 'ernie-bot',
  },
} as const;

/**
 * Enum for system-defined roles in conversations or actions.
 * Represents various participant types in an AI system.
 */
export enum Role {
  USER = 'user', // End-user
  SYSTEM = 'system', // Backend system
  ASSISTANT = 'assistant', // AI assistant or bot
  FUNCTION = 'function', // Specific function/task handler
}

/**
 * Roles associated with interactions in an LLM context.
 */
export type LLMRoleType = 'user' | 'system' | 'assistant' | 'function';
