import { IndexType } from '@leek/constants';

/**
 * Interface for embedding with metadata.
 *
 * Represents an embedding along with its associated metadata, such as content,
 * answer, document format, hash, and similarity distance.
 */
export interface EmbeddingWithMetadata {
  /**
   * The main content associated with the embedding.
   */
  content: string;

  /**
   * The answer derived from the content or embedding.
   */
  answer: string;

  /**
   * The document format associated with the embedding.
   */
  docForm: IndexType;

  /**
   * The hash value uniquely identifying this embedding.
   */
  hash: string;

  /**
   * The similarity distance between the embedding and a query vector.
   */
  _distance: number;

  /**
   * Additional metadata fields.
   */
  [key: string]: any;
}
