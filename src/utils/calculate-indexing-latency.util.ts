const MEAN_INDEXING_LATENCY = 1131.9;

/**
 * Calculate the estimated indexing latency.
 *
 * This function computes the latency based on the number of split documents and
 * the mean indexing latency per document. The result is rounded to 5 decimal places.
 *
 * @param {number} splitDocsLength - The number of split documents to be indexed.
 * @returns {number} - The estimated indexing latency in seconds, rounded to 5 decimal places.
 */
export function calculateIndexingLatency(splitDocsLength: number): number {
  if (!Number.isFinite(splitDocsLength) || splitDocsLength < 0) {
    throw new Error('Invalid splitDocsLength: must be a non-negative finite number.');
  }

  const latency = MEAN_INDEXING_LATENCY * splitDocsLength;
  return parseFloat(latency.toFixed(5));
}
