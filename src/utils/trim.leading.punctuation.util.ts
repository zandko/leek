/**
 * Removes leading punctuation and symbols from a string.
 *
 * This function trims any punctuation or symbol characters from the start of the input string.
 * It uses Unicode property escapes (`\p{P}` and `\p{S}`) for robust handling of diverse languages and character sets.
 *
 * @param {string} content - The input string to process.
 * @returns {string} - The input string with leading punctuation and symbols removed.
 *
 * @example
 * trimLeadingPunctuation('...Hello!'); // Returns: 'Hello!'
 * trimLeadingPunctuation('***Welcome to the world'); // Returns: 'Welcome to the world'
 * trimLeadingPunctuation('###'); // Returns: ''
 */
export function trimLeadingPunctuation(content: string): string {
  const punctuationRegex = /^[\p{P}\p{S}]+/u;
  return content.replace(punctuationRegex, '');
}
