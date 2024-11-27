import { LeekEmbedding } from '../../domain/embedding';
import { EmbeddingWithMetadata } from '../../shared/interfaces/embedding.with.metadata';

/**
 * Abstract repository interface for embeddings.
 *
 * Defines the methods for interacting with embeddings in the data storage layer.
 *
 * **Method Order Guideline**:
 * 1. **Create**: Methods that create new records.
 * 2. **Read**: Methods that retrieve data (e.g., findMany, findById).
 * 3. **Update**: Methods that modify existing records.
 * 4. **Delete**: Methods that remove records.
 *
 * When adding new methods, place them under the appropriate CRUD category
 * to maintain logical organization and consistency.
 */
export abstract class EmbeddingRepository {
  /**
   * Register multiple embeddings.
   *
   * This method registers an array of embeddings in the data store.
   *
   * @param {LeekEmbedding[]} data - An array of embeddings to register.
   * @returns {Promise<void>} - Resolves when all embeddings are registered.
   */
  abstract registerEmbeddings(data: LeekEmbedding[]): Promise<void>;

  /**
   * Perform a similarity search with a vector and return scores.
   *
   * This method performs a similarity search using the specified vector and class prefix.
   * It returns the most similar embeddings along with their similarity scores, filtered by a score threshold if provided.
   *
   * @param {number[]} vector - The query vector for similarity search.
   * @param {string} classPrefix - The class prefix to filter the embeddings.
   * @param {number} k - The number of most similar embeddings to return.
   * @param {number} [scoreThreshold] - An optional minimum score threshold for filtering results.
   * @returns {Promise<EmbeddingWithMetadata[]>} - An array of matching embeddings with metadata and scores.
   */
  abstract similaritySearchVectorWithScore(
    vector: number[],
    classPrefix: string,
    k: number,
    scoreThreshold?: number,
  ): Promise<EmbeddingWithMetadata[]>;

  /**
   * Updates embeddings in the data store based on their hash and class prefix.
   *
   * This method updates the embeddings that match a specific `classPrefix` and `hash`.
   * The `embedding` field will be updated, along with other metadata fields such as `modelName` and `providerName`.
   * The system assumes the provided `classPrefix` and `hash` combination uniquely identifies an embedding.
   *
   * @param {LeekEmbedding[]} data - An array of embeddings to update. Each embedding should contain the new vector data and metadata for the update.
   * @returns {Promise<void>} - A promise that resolves when all embeddings have been successfully updated.
   */
  abstract updateEmbeddingsByHashAndClassPrefix(data: LeekEmbedding[]): Promise<void>;

  /**
   * Delete embeddings by hash and class prefix.
   *
   * This method deletes embeddings identified by the specified hash and class prefix.
   *
   * @param {string} hash - The hash value of the embeddings to delete.
   * @param {string} classPrefix - The class prefix of the embeddings.
   * @returns {Promise<void>} - Resolves when the embeddings are deleted.
   */
  abstract deleteManyEmbeddingsByHashAndClassPrefix(hash: string, classPrefix: string): Promise<void>;

  /**
   * Delete embeddings by class prefix.
   *
   * This method deletes all embeddings associated with the specified class prefix.
   *
   * @param {string} classPrefix - The class prefix of the embeddings to delete.
   * @returns {Promise<void>} - Resolves when the embeddings are deleted.
   */
  abstract deleteManyEmbeddingsByClassPrefix(classPrefix: string): Promise<void>;
}
