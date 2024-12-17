/**
 * Extract the file extension from a file name.
 *
 * This function retrieves the substring after the last dot (`.`) in the file name.
 * If no dot is found, an empty string is returned.
 *
 * @param {string} fileName - The name of the file to extract the extension from.
 * @returns {string} - The file extension in lowercase, or an empty string if no extension exists.
 *
 * @example
 * extractFileExtension('example.txt'); // Returns: 'txt'
 * extractFileExtension('archive.tar.gz'); // Returns: 'gz'
 * extractFileExtension('no-extension'); // Returns: ''
 */
export function extractFileExtensionUtil(fileName: string): string {
  if (!fileName || typeof fileName !== 'string') {
    throw new Error('Invalid input: fileName must be a non-empty string.');
  }

  const index = fileName.lastIndexOf('.');

  // If no dot is found or dot is at the start (e.g., '.hiddenfile'), return an empty string
  if (index === -1 || index === 0) {
    return '';
  }

  return fileName.substring(index + 1).toLowerCase();
}
