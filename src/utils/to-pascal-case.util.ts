/**
 * Converts a string to PascalCase (capitalizing the first letter and lowercasing the rest).
 * Commonly used for formatting class names or entity names.
 * @param input The input string to format.
 * @returns The formatted string in PascalCase.
 */
export function toPascalCase(input: string): string {
  if (typeof input !== 'string' || !input.trim()) {
    throw new Error('Input must be a non-empty string.');
  }
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
