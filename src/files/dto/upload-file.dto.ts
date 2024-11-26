import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for uploading a file.
 *
 * Used to handle and validate file upload requests with optional metadata.
 */
export class UploadFileDto {
  /**
   * The uploaded file.
   *
   * Accepts binary data for file uploads through an API endpoint.
   *
   * @type {Express.Multer.File}
   * @example A file uploaded via a form-data request.
   */
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be uploaded.',
  })
  file: Express.Multer.File;

  /**
   * An optional description for the file.
   *
   * This metadata provides additional context or information about the uploaded file.
   *
   * @type {string}
   * @example "This is a sample file description."
   */
  @ApiPropertyOptional({
    description: 'Optional description of the file.',
    example: 'This is a sample file description.',
  })
  description?: string;
}
