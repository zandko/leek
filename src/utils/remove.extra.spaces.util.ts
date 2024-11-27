/**
 * Normalize spaces in a string.
 *
 * This function replaces multiple consecutive whitespace characters (spaces, tabs, line breaks, etc.)
 * with a single space and trims leading and trailing whitespace.
 *
 * @param {string} text - The input string to normalize.
 * @returns {string} - The normalized string with extra spaces removed.
 *
 * @example
 * removeExtraSpaces('  Hello   World  '); // Returns: 'Hello World'
 * removeExtraSpaces('\tLine1\n\nLine2   '); // Returns: 'Line1 Line2'
 */
export function removeExtraSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}
