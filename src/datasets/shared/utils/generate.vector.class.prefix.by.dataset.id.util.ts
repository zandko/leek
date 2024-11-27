/**
 * Generates a vector class prefix.
 *
 * Dynamically generates a unique prefix for the vector index based on the dataset ID.
 * This prefix is used to uniquely identify the nodes of a specific dataset.
 *
 * @param {string} datasetId - The unique identifier of the dataset.
 * @returns {string} - The dynamically generated vector class prefix.
 */
export const generateVectorClassPrefixByDatasetId = (datasetId: string): string => {
  if (!datasetId) {
    throw new Error('Invalid datasetId: A non-empty string is required.');
  }
  return `Vector_index_${datasetId}_Node`;
};
