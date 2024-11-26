import { ValidationOptions } from 'class-validator';
import { IsPhoneNumber as isPhoneNumber } from 'class-validator';

/**
 * Custom property decorator to validate phone numbers.
 *
 * This decorator validates that a property contains a valid phone number. The region
 * for phone number validation can be specified, and additional validation options
 * can be provided as needed.
 *
 * @param {ValidationOptions & { region?: Parameters<typeof isPhoneNumber>[0] }} [validationOptions]
 * - Validation options to customize the validation behavior, including the region for phone numbers.
 * @returns {PropertyDecorator} - A property decorator that enforces phone number validation.
 */
export function IsPhoneNumber(
  validationOptions?: ValidationOptions & {
    region?: Parameters<typeof isPhoneNumber>[0];
  },
): PropertyDecorator {
  return isPhoneNumber(validationOptions?.region, {
    message: 'error.phoneNumber',
    ...validationOptions,
  });
}
