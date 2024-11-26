import { isString } from 'lodash';

/**
 * Type for a single question-answer pair.
 */
export interface QAPair {
  question: string;
  answer: string;
}

/**
 * Extract question-answer pairs from text.
 *
 * Parses the input text to extract pairs of questions starting with "Q" and answers starting with "A".
 * The results are formatted into an array of objects with `question` and `answer` properties.
 *
 * @param {string} text - The input text containing question-answer pairs.
 * @returns {QAPair[]} - An array of objects, each containing a question and its corresponding answer.
 */
export function extractQAPairsFromText(text: string): QAPair[] {
  if (!text || !isString(text)) return [];

  // Regular expression to match question-answer pairs
  const regex = /Q\d+:\s*(.*?)\s*A\d+:\s*([\s\S]*?)(?=Q\d+:|$)/g;

  // Match all question-answer pairs in the input text
  const matches = Array.from(text.matchAll(regex));

  return matches
    .map((match) => {
      const question = match[1]?.trim() || '';
      const answer = match[2]?.trim().replace(/\n\s*/g, '\n') || '';
      return { question, answer };
    })
    .filter((pair) => pair.question && pair.answer);
}
