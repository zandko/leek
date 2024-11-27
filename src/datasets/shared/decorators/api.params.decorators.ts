import { ApiParam } from '@nestjs/swagger';

/**
 * Creates an API parameter decorator for dataset ID.
 *
 * This decorator adds a parameter for the unique identifier of a dataset (UUID).
 *
 * @param {string} name - The name of the parameter. Defaults to 'dataset_id'.
 * @returns {ReturnType<typeof ApiParam>} - The API parameter decorator.
 */
export const ApiDatasetIdParam = (name: string = 'dataset_id') =>
  ApiParam({
    name,
    description: 'The unique identifier of the dataset (UUID).',
  });

/**
 * Creates an API parameter decorator for document ID.
 *
 * This decorator adds a parameter for the unique identifier of a document within a dataset (UUID).
 *
 * @returns {ReturnType<typeof ApiParam>} - The API parameter decorator.
 */
export const ApiDocumentIdParam = () =>
  ApiParam({
    name: 'document_id',
    description: 'The unique identifier of the document within the dataset (UUID).',
  });

/**
 * Creates an API parameter decorator for segment ID.
 *
 * This decorator adds a parameter for the unique identifier of a segment within a document (UUID).
 *
 * @returns {ReturnType<typeof ApiParam>} - The API parameter decorator.
 */
export const ApiSegmentIdParam = () =>
  ApiParam({
    name: 'segment_id',
    description: 'The unique identifier of the segment within the document (UUID).',
  });
