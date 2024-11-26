import { Embeddings } from '@langchain/core/embeddings';
import { getEnvironmentVariable } from '@langchain/core/utils/env';
import { OpenAIEmbeddings, OpenAIEmbeddingsParams, AzureOpenAIInput, ClientOptions } from '@langchain/openai';

import { EmbeddingProvider, EmbeddingModels } from '@leek/constants';

/**
 * Type definitions for configuration fields based on the embedding provider.
 */
type ProviderConfigMap = {
  [EmbeddingProvider.OpenAI]: Partial<OpenAIEmbeddingsParams> &
    Partial<AzureOpenAIInput> & {
      verbose?: boolean;
      apiKey?: string;
      configuration?: ClientOptions;
    };
  // Add other providers with their specific configurations as needed.
};

/**
 * Generic type to represent any provider configuration.
 */
type EmbeddingsParams<T extends EmbeddingProvider> = T extends keyof ProviderConfigMap ? ProviderConfigMap[T] : never;

/**
 * Initializes an Embedding instance based on the specified provider.
 *
 * @param provider - The embedding service provider.
 * @param fields - The configuration fields required by the provider.
 * @returns An instance of the corresponding embedding service.
 */
export function initEmbeddings<T extends EmbeddingProvider>(
  fields?: EmbeddingsParams<T>,
  provider: T = EmbeddingProvider.OpenAI as T,
): Embeddings {
  switch (provider) {
    case EmbeddingProvider.OpenAI:
      return new OpenAIEmbeddings({
        model: EmbeddingModels[EmbeddingProvider.OpenAI].TEXT_EMBEDDING_3_SMALL,
        apiKey: getEnvironmentVariable('OPENAI_API_KEY'),
        configuration: {
          baseURL: getEnvironmentVariable('OPENAI_API_HOST'),
        },
        ...(fields as ProviderConfigMap[EmbeddingProvider.OpenAI]),
      });
    // Add more cases here for additional providers
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
