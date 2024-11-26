import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

/**
 * Custom validation decorator to ensure a property matches another property's value.
 *
 * This is useful for scenarios like confirming passwords or matching related fields.
 *
 * @param {string} property - The name of the property to compare against.
 * @param {ValidationOptions} [validationOptions] - Optional validation options for customization.
 * @returns {PropertyDecorator} - A property decorator for validation.
 *
 * @example
 * class ChangePasswordDto {
 *   @IsNotEmpty()
 *   password: string;
 *
 *   @IsNotEmpty()
 *   @SameAs('password', { message: 'Confirm password must match password' })
 *   confirmPassword: string;
 * }
 */
export function SameAs(property: string, validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object, propertyName: string | symbol) {
    registerDecorator({
      name: 'sameAs',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value, args) {
          const [relatedPropertyName] = args!.constraints as [string];

          return (<any>args!.object)[relatedPropertyName] === value;
        },
        defaultMessage() {
          return '$property must match $constraint1';
        },
      },
    });
  };
}
