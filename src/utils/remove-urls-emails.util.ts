/**
 * Remove URLs and email addresses from a string.
 *
 * This function removes:
 * - URLs starting with `http://`, `https://`, or `www.`
 * - Email addresses (e.g., `user@example.com`)
 *
 * @param {string} text - The input string to clean.
 * @returns {string} - The cleaned string with URLs and email addresses removed.
 *
 * @example
 * removeUrlsEmails('Visit https://example.com or contact me at user@example.com');
 * // Returns: 'Visit  or contact me at '
 *
 * removeUrlsEmails('Email admin@domain.com or visit www.example.com');
 * // Returns: 'Email  or visit '
 */
export function removeUrlsEmails(text: string): string {
  return text.replace(/https?:\/\/[^\s]+|www\.[^\s]+|[\w.-]+@[\w.-]+\.[a-z]{2,}/gi, '');
}
