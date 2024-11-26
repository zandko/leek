import { ChatMessage } from '@langchain/core/messages';

/**
 * Encodes a string using the GPT tokenizer and returns the token count.
 *
 * This function dynamically imports the GPT tokenizer, encodes the provided string,
 * and calculates the number of tokens.
 *
 * @param {string} str - The input string to encode.
 * @returns {Promise<number>} - The number of tokens in the encoded string.
 *
 * @example
 * const tokenCount = await encodeAsync('Hello, World!');
 * console.log(tokenCount); // Example output: 3
 */
export const encodeAsync = async (str: string) => {
  const { encode } = await import('gpt-tokenizer');

  return encode(str).length;
};

/**
 * Calculates the total token count for an array of chat messages.
 *
 * This function extracts the content of each chat message, concatenates them,
 * and calculates the total number of tokens using the GPT tokenizer.
 *
 * @param {ChatMessage[]} messages - An array of chat messages to calculate the token count for.
 * @returns {Promise<number>} - The total token count of the combined message contents.
 *
 * @example
 * const messages: ChatMessage[] = [
 *   { content: 'Hello', role: 'user' },
 *   { content: 'Hi there!', role: 'assistant' },
 * ];
 * const totalTokens = await getMessagesTokenCount(messages);
 * console.log(totalTokens); // Example output: 5
 */
export const getMessagesTokenCount = async (messages: ChatMessage[]) =>
  encodeAsync(messages.map((m) => m.content).join(''));
