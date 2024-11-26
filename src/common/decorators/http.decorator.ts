import type { PipeTransform } from '@nestjs/common';
import { Param, ParseUUIDPipe } from '@nestjs/common';
import type { Type } from '@nestjs/common/interfaces';

/**
 * Creates a parameter decorator that enforces a UUID format.
 *
 * This decorator ensures that the specified parameter is a valid UUID (version 4) and allows
 * additional custom pipes to be applied for further transformations or validations.
 *
 * @param {string} property - The name of the parameter to validate.
 * @param {'3' | '4' | '5'} version - The version to be selected.
 * @param {...Array<Type<PipeTransform> | PipeTransform>} pipes - Additional pipes to apply after the UUID validation.
 * @returns {ParameterDecorator} - A parameter decorator that applies UUID validation and optional pipes.
 */
export function UUIDParam(
  property: string,
  version: '3' | '4' | '5' = '4',
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version }), ...pipes);
}
