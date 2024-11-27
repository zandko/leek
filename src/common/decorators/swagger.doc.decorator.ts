import { applyDecorators } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

import { toPascalCase } from '@leek/utils';

/**
 * Action types for standardizing operations and responses.
 */
type ActionType =
  | 'CREATE'
  | 'RETRIEVE'
  | 'LIST'
  | 'UPDATE'
  | 'DELETE'
  | 'ENABLE'
  | 'DISABLE'
  | 'ARCHIVE'
  | 'UNARCHIVE'
  | 'UPLOAD';

/**
 * Standardized API metadata for operations and responses.
 */
const ActionMetadata: Record<
  ActionType,
  { summary: string; description: string; successStatusCode: HttpStatus; responseDescription: string }
> = {
  CREATE: {
    summary: 'Create a new instance of the {entity} resource',
    description: `
      Initializes a new {entity} resource in the system. 
      This operation requires a client request with a structured JSON payload adhering to the {entity} schema specification. 
      Mandatory fields in the schema must be provided, and optional fields will default to their predefined values if omitted. 
      A successful operation returns the resource's canonical representation, including its unique identifier (UUID) and metadata.
    `,
    successStatusCode: HttpStatus.CREATED,
    responseDescription:
      'The {entity} resource has been created successfully, and its serialized representation is returned.',
  },
  RETRIEVE: {
    summary: 'Retrieve a specific {entity} resource by its identifier',
    description: `
      Fetches a single {entity} resource from the system using its globally unique identifier (UUID). 
      This endpoint is read-only and designed to provide a complete, non-paginated view of the resource, including its attributes and relationships. 
      The client must ensure the identifier conforms to UUID format and the resource exists.
    `,
    successStatusCode: HttpStatus.OK,
    responseDescription: 'A JSON-encoded object representing the {entity} resource is returned.',
  },
  LIST: {
    summary: 'Retrieve a paginated collection of {entityPlural}',
    description: `
      Queries the system for a collection of {entityPlural} resources. 
      The response supports pagination and may include additional metadata (e.g., total count, current page). 
      Query parameters allow clients to filter results based on specific attributes, apply sorting, and limit the size of the result set. 
      This operation adheres to the OpenAPI pagination standard and implements efficient query execution for large datasets.
    `,
    successStatusCode: HttpStatus.OK,
    responseDescription: 'A paginated collection of {entityPlural} resources, along with metadata, is returned.',
  },
  UPDATE: {
    summary: 'Partially update an existing {entity} resource',
    description: `
      Performs a partial update on a specific {entity} resource identified by its UUID. 
      The request payload should include only the fields to be modified, following the JSON Patch format or similar conventions. 
      Fields not specified in the payload remain unchanged. 
      This operation complies with the PATCH semantics defined in RFC 5789.
    `,
    successStatusCode: HttpStatus.NO_CONTENT,
    responseDescription: 'The {entity} resource has been successfully updated. No content is returned.',
  },
  DELETE: {
    summary: 'Permanently delete a {entity} resource by its identifier',
    description: `
      Removes a {entity} resource from the system using its UUID. 
      This action is irreversible and deletes all associated data. 
      Clients must ensure that the identifier exists and that the operation complies with the system's data retention policies.
    `,
    successStatusCode: HttpStatus.NO_CONTENT,
    responseDescription: 'The {entity} resource has been deleted successfully. No content is returned.',
  },
  ENABLE: {
    summary: 'Activate a disabled {entity} resource',
    description: `
      Reactivates a previously disabled {entity} resource in the system. 
      The operation updates the resource status to "active" without modifying other attributes. 
      A valid UUID must be provided to identify the resource.
    `,
    successStatusCode: HttpStatus.NO_CONTENT,
    responseDescription: 'The {entity} resource has been enabled and is now active.',
  },
  DISABLE: {
    summary: 'Deactivate an active {entity} resource',
    description: `
      Temporarily deactivates an active {entity} resource. 
      The resource remains in the system but transitions to an "inactive" status, making it unavailable for certain operations. 
      The operation does not affect the resource's data or relationships.
    `,
    successStatusCode: HttpStatus.NO_CONTENT,
    responseDescription: 'The {entity} resource has been disabled and is now inactive.',
  },
  ARCHIVE: {
    summary: 'Archive a specific {entity} resource',
    description: `
      Transitions a {entity} resource into an "archived" state. 
      Archived resources are typically read-only and excluded from active queries or workflows. 
      This operation is designed for compliance or record-keeping scenarios.
    `,
    successStatusCode: HttpStatus.NO_CONTENT,
    responseDescription: 'The {entity} resource has been archived successfully.',
  },
  UNARCHIVE: {
    summary: 'Restore an archived {entity} resource to active state',
    description: `
      Reverts a {entity} resource from an "archived" state back to its active state. 
      The operation ensures that the resource becomes available for normal operations and workflows again. 
      A valid UUID is required to identify the resource.
    `,
    successStatusCode: HttpStatus.NO_CONTENT,
    responseDescription: 'The {entity} resource has been restored to active state successfully.',
  },
  UPLOAD: {
    summary: 'Upload a file to associate with the {entity} resource',
    description: `
      Uploads a file to the system and associates it with a specific {entity} resource. 
      The client must provide the file as a multipart/form-data payload, along with optional metadata in the request body. 
      This operation supports various file types, including text, images, and binary data, and validates the uploaded file for size and format constraints. 
      A successful upload operation returns the file's unique identifier and metadata.
    `,
    successStatusCode: HttpStatus.CREATED,
    responseDescription: 'The file has been uploaded successfully and is associated with the {entity} resource.',
  },
};

/**
 * Generates a standardized `ApiOperation` decorator.
 * @param entityName Name of the entity (singular, e.g., "Document").
 * @param action Action type (e.g., "create", "retrieve").
 */
export function SwaggerDocOperation(entityName: string, action: ActionType) {
  const formattedEntityName = toPascalCase(entityName);

  const metadata = ActionMetadata[action];
  if (!metadata) {
    throw new Error(`Unsupported action type: ${action}`);
  }

  const summary = metadata.summary
    .replace('{entity}', formattedEntityName)
    .replace('{entityPlural}', `${formattedEntityName}s`);
  const description = metadata.description
    .replace('{entity}', formattedEntityName)
    .replace('{entityPlural}', `${formattedEntityName}s`);

  return ApiOperation({ summary, description });
}

/**
 * Generates a standardized `ApiResponse` decorator.
 * @param entityName Name of the entity (singular, e.g., "Document").
 * @param action Action type (e.g., "create", "retrieve").
 * @param responseType Response type (TypeScript class representing the response structure).
 */
export function SwaggerDocResponse(entityName: string, action: ActionType, responseType?: any) {
  const formattedEntityName = toPascalCase(entityName);

  const metadata = ActionMetadata[action];
  if (!metadata) {
    throw new Error(`Unsupported action type: ${action}`);
  }

  const description = metadata.responseDescription
    .replace('{entity}', formattedEntityName)
    .replace('{entityPlural}', `${formattedEntityName}s`);
  const options: ApiResponseOptions = {
    status: metadata.successStatusCode,
    description,
  };

  if (responseType) {
    options.type = responseType;
  }

  return ApiResponse(options);
}

/**
 * Combines `ApiOperation`, `ApiResponse`, `Version`, and `HttpCode` into one decorator.
 * @param entityName Name of the entity (singular, e.g., "Document").
 * @param action Action type (e.g., "create", "retrieve").
 * @param responseType Response type (TypeScript class representing the response structure).
 */
export function SwaggerDoc(entityName: string, action: ActionType, responseType?: any) {
  return applyDecorators(SwaggerDocOperation(entityName, action), SwaggerDocResponse(entityName, action, responseType));
}
