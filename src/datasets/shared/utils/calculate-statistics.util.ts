import { Document } from '@langchain/core/documents';

import { encodeAsync } from '@leek/langchain';

/**
 * Calculates statistical information for a set of documents.
 *
 * This function processes an array of documents to compute the total word count,
 * total token count, and token counts for each document segment.
 *
 * @param {Document[]} documents - The array of documents to be analyzed.
 * @returns {Promise<{ totalWordCount: number; totalTokens: number; tokensPerSegment: number[] }>}
 * An object containing:
 *  - `totalWordCount`: The total number of words across all documents (excluding whitespace).
 *  - `totalTokens`: The total number of tokens across all documents.
 *  - `tokensPerSegment`: An array of token counts for each individual document segment.
 */
export async function calculateStatisticsForDocuments(documents: Document[]): Promise<{
  totalWordCount: number;
  totalTokens: number;
  tokensPerSegment: number[];
}> {
  let totalWordCount = 0;
  let totalTokens = 0;
  const tokensPerSegment: number[] = [];

  for (const { pageContent } of documents) {
    // Calculate word count
    const wordCount = pageContent.replace(/\s+/g, '').length;
    totalWordCount += wordCount;

    // Calculate token count
    const tokenCount = await encodeAsync(pageContent);
    totalTokens += tokenCount;

    // Store segment token count
    tokensPerSegment.push(tokenCount);
  }

  return { totalWordCount, totalTokens, tokensPerSegment };
}
