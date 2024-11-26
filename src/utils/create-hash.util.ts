import crypto from 'crypto';

/**
 * Generate a SHA-256 hash from the given input.
 *
 * This function computes a cryptographic hash using the SHA-256 algorithm for the provided string
 * or buffer. The output is returned as a hexadecimal string.
 *
 * @param {string | Buffer} input - The input data to hash. Can be a string or a buffer.
 * @returns {string} - The SHA-256 hash of the input in hexadecimal format.
 */
export function createHash(input: string | Buffer): string {
  if (!input || (typeof input !== 'string' && !Buffer.isBuffer(input))) {
    throw new Error('Invalid input: must be a non-empty string or Buffer.');
  }

  return crypto.createHash('sha256').update(input).digest('hex');
}
