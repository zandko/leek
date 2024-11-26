import { Injectable } from '@nestjs/common';

import * as nodejieba from 'nodejieba';

import { STOPWORDS } from '@leek/constants';

/**
 * A service for extracting keywords from text using Jieba and expanding them into subtokens.
 */
@Injectable()
export class JiebaKeywordService {
  /**
   * Extracts keywords from the input text and expands them into subtokens.
   *
   * This method uses Jieba's keyword extraction to identify important terms,
   * then breaks them into subtokens and filters out stopwords.
   *
   * @param {string} text - The input text to extract keywords from.
   * @param {number} [maxKeywordsPerChunk=10] - The maximum number of keywords to extract per chunk.
   * @returns {string[]} - An array of unique keywords and expanded subtokens.
   *
   * @example
   * const keywords = jiebaKeywordService.extractKeywordsWithSubtokens('This is an example text.', 5);
   * console.log(keywords); // Output: ['example', 'text', 'exam', 'ple']
   */
  extractKeywordsWithSubtokens(text: string, maxKeywordsPerChunk: number = 10): string[] {
    const keywords = nodejieba.extract(text, maxKeywordsPerChunk).map((item) => item.word);
    return this.generateSubtokensFromKeywords(new Set<string>(keywords));
  }

  /**
   * Generates subtokens from a set of keywords and removes stopwords.
   *
   * Subtokens are extracted by splitting words into alphanumeric segments. Stopwords are filtered out.
   *
   * @private
   * @param {Set<string>} keywords - A set of keywords to expand.
   * @returns {string[]} - An array of unique expanded subtokens.
   */
  private generateSubtokensFromKeywords(tokens: Set<string>): string[] {
    const results = new Set<string>();

    for (const token of tokens) {
      results.add(token);
      const subTokens = token.match(/\w+/g); // Matches word-like substrings.
      if (subTokens && subTokens.length > 1) {
        subTokens.forEach((subToken) => {
          if (!STOPWORDS.has(subToken)) {
            results.add(subToken);
          }
        });
      }
    }

    return [...results];
  }
}
