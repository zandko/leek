import { NIL, v4 as uuidv4 } from 'uuid';

const validateRegex =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

/**
 * Generates a random UUID (v4).
 *
 * This function uses the `uuid` library to generate a UUID based on random numbers.
 *
 * @returns {string} - A newly generated UUID (v4).
 *
 * @example
 * const newUuid = uuid();
 * console.log(newUuid); // Example output: "550e8400-e29b-41d4-a716-446655440000"
 */
export const uuid = () => uuidv4();

/**
 * Validates whether a given string is a valid UUID (v4).
 *
 * This function checks if the provided value matches the UUID (v4) format,
 * including support for the nil UUID (`00000000-0000-0000-0000-000000000000`).
 *
 * @param {unknown} uuid - The value to validate.
 * @returns {boolean} - `true` if the value is a valid UUID (v4), otherwise `false`.
 *
 * @example
 * const isValid = validateUuid('550e8400-e29b-41d4-a716-446655440000');
 * console.log(isValid); // Output: true
 *
 * const isInvalid = validateUuid('invalid-uuid-string');
 * console.log(isInvalid); // Output: false
 */
export const uuidValidate = (uuid: unknown) => {
  if (!uuid || typeof uuid !== 'string') return false;
  return validateRegex.test(uuid);
};

/**
 * A constant representing the nil UUID.
 *
 * The nil UUID is a special form of UUID where all bits are set to zero.
 * It is commonly used as a placeholder or temporary ID in cases where
 * an ID is required but not yet available.
 *
 * @constant
 * @type {string}
 *
 * @example
 * console.log(DUMMY_ID); // Output: "00000000-0000-0000-0000-000000000000"
 */
export const DUMMY_ID = NIL;
