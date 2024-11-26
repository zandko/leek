import { ChatBaiduQianfan } from '@langchain/baidu-qianfan';
import { BaseChatModelParams } from '@langchain/core/language_models/chat_models';
import { getEnvironmentVariable } from '@langchain/core/utils/env';
import { ChatOpenAI, ChatOpenAIFields } from '@langchain/openai';

import { LLMProvider, LanguageModels } from '@leek/constants';

/**
 * Type definitions for configuration fields based on the model provider.
 */
type ProviderConfigMap = {
  [LLMProvider.OpenAI]: ChatOpenAIFields;
  [LLMProvider.Qianfan]: Partial<LEEK.BaiduQianfanChatInput> & BaseChatModelParams;
  // Add other providers with their specific configurations as needed.
};

/**
 * Generic type to represent any provider configuration.
 */
type ModelsParams<T extends LLMProvider> = T extends keyof ProviderConfigMap ? ProviderConfigMap[T] : never;

/**
 * Type to define the return types for the `initModels` function.
 */
type ModelInstancesMap = {
  [LLMProvider.OpenAI]: ChatOpenAI;
  [LLMProvider.Qianfan]: ChatBaiduQianfan;
  // Add other provider return types here.
};

type ModelReturnType<T extends LLMProvider> = T extends keyof ModelInstancesMap ? ModelInstancesMap[T] : never;

/**
 * Initializes an Model instance based on the specified provider.
 *
 * @param provider - The model service provider.
 * @param fields - The configuration fields required by the provider.
 * @returns An instance of the corresponding model service.
 */
export function initModels<T extends LLMProvider>(
  fields: ModelsParams<T>,
  provider: T = LLMProvider.OpenAI as T,
): ModelReturnType<T> {
  switch (provider) {
    case LLMProvider.OpenAI:
      return new ChatOpenAI({
        model: LanguageModels[LLMProvider.OpenAI].GPT_4_O_MINI,
        apiKey: getEnvironmentVariable('OPENAI_API_KEY'),
        temperature: 0,
        configuration: {
          baseURL: getEnvironmentVariable('OPENAI_API_HOST'),
        },
        ...(fields as ProviderConfigMap[LLMProvider.OpenAI]),
      }) as ModelReturnType<T>;
    case LLMProvider.Qianfan:
      return new ChatBaiduQianfan({
        model: LanguageModels[LLMProvider.Qianfan].ERNIE_BOT,
        ...(fields as ProviderConfigMap[LLMProvider.Qianfan]),
      }) as ModelReturnType<T>;
    // Add more cases here for additional providers
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
