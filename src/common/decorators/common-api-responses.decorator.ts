import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

// Create a reusable decorator for common response codes
export const CommonApiResponses = () =>
  applyDecorators(
    ApiBadRequestResponse({ description: 'Invalid request parameters.' }),
    ApiUnauthorizedResponse({ description: 'Authentication credentials are missing or invalid.' }),
    ApiForbiddenResponse({ description: 'Access to the requested resource is forbidden.' }),
    ApiInternalServerErrorResponse({ description: 'An unexpected error occurred on the server.' }),
  );
