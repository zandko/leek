import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) for uploading a text file.
 *
 * This DTO handles and validates the payload for text-based file uploads.
 */
export class UploadTextFileDto {
  /**
   * The name of the document.
   *
   * Represents the title or identifier for the uploaded document.
   *
   * @type {string}
   * @example "text"
   */
  @ApiProperty({
    description: 'The name of the document.',
    example: 'text',
  })
  @IsString()
  name: string;

  /**
   * The content of the document.
   *
   * Holds the main text body of the document being uploaded.
   *
   * @type {string}
   * @example "This is the content of the document."
   */
  @ApiProperty({
    description: 'The content of the document.',
    example: 'This is the content of the document.',
  })
  @IsString()
  text: string;

  /**
   * An optional description for the document.
   *
   * Provides additional details or metadata about the text document.
   *
   * @type {string}
   * @example "This is a sample description for the text file."
   */
  @ApiPropertyOptional({
    description: 'Optional description of the document.',
    example: 'This is a sample description for the text file.',
  })
  description?: string;
}
