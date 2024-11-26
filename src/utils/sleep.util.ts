import { promisify } from 'util';

/**
 * Creates a promise that resolves after a specified delay.
 *
 * This utility function can be used to pause execution asynchronously for a given duration.
 *
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} - A promise that resolves after the specified delay.
 *
 * @example
 * // Usage in an async function
 * await sleep(1000); // Pauses for 1 second
 *
 * @example
 * // Usage with .then()
 * sleep(500).then(() => console.log('500ms have passed'));
 */
export const sleep = promisify(setTimeout);
