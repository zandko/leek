import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';

/**
 * Represents a file entity with metadata and storage information.
 */
export class LeekFile {
  /**
   * Unique identifier for the file.
   * @example "3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c"
   */
  @ApiProperty({
    description: 'Unique identifier for the file.',
    example: '3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c',
  })
  id: string;

  /**
   * Storage type (e.g., local or cloud storage).
   * Default value is "cos" (cloud object storage).
   * @example "cos"
   */
  @ApiPropertyOptional({
    description: 'Type of storage, e.g., local or cloud storage type.',
    example: 'cos',
  })
  @Exclude()
  storageType?: string = 'cos';

  /**
   * Unique key for the file in the storage system.
   * Used to locate the file in storage.
   * @example "upload_files/804f3d62-a2be-4375-8aa6-f0d2d08922ff/989efe03-6d61-4dc2-a9b6-8764eeef8355.pdf"
   */
  @ApiProperty({
    description: 'Unique key for the file in storage.',
    example: 'upload_files/804f3d62-a2be-4375-8aa6-f0d2d08922ff/989efe03-6d61-4dc2-a9b6-8764eeef8355.pdf',
  })
  @Exclude()
  key: string;

  /**
   * Name of the file.
   * @example "Zhejiang Government Services Public Payment.pdf"
   */
  @ApiProperty({
    description: 'Name of the file.',
    example: 'Zhejiang Government Services Public Payment.pdf',
  })
  name: string;

  /**
   * Optional description of the file.
   * @example "This is a file description."
   */
  @ApiPropertyOptional({
    description: 'Optional description of the file.',
    example: 'This is a file description.',
  })
  description?: string;

  /**
   * Size of the file in bytes.
   * @example 156819
   */
  @ApiProperty({
    description: 'Size of the file in bytes.',
    example: 156819,
  })
  size: number;

  /**
   * File extension (e.g., "pdf").
   * @example "pdf"
   */
  @ApiProperty({
    description: 'File extension.',
    example: 'pdf',
  })
  extension: string;

  /**
   * Optional MIME type of the file.
   * @example "application/pdf"
   */
  @ApiPropertyOptional({
    description: 'MIME type of the file.',
    example: 'application/pdf',
  })
  mimeType?: string;

  /**
   * Indicates whether the file has been used.
   * Default is `false`.
   * @example false
   */
  @ApiPropertyOptional({
    description: 'Indicates if the file has been used.',
    example: false,
  })
  @Exclude()
  used?: boolean;

  /**
   * The timestamp when the file was last used.
   * @example "2023-01-01T00:00:00Z"
   */
  @ApiPropertyOptional({
    description: 'Timestamp of when the file was last used.',
    example: '2023-01-01T00:00:00Z',
  })
  @Exclude()
  usedAt?: Date;

  /**
   * Hash value of the file, typically used for verifying integrity.
   * @example "c6bd97a16ea91fc05155d82af79516c013c5488f175191372bbb07c7031c77fc"
   */
  @ApiPropertyOptional({
    description: 'Hash value of the file for integrity verification.',
    example: 'c6bd97a16ea91fc05155d82af79516c013c5488f175191372bbb07c7031c77fc',
  })
  @Exclude()
  hash?: string;
  /**
   * Timestamp when the file was created.
   * @example "2023-01-01T00:00:00Z"
   */
  @ApiProperty({
    description: 'Timestamp when the file was created.',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;

  /**
   * Constructor for the `LeekFile` class.
   * Allows partial initialization by accepting an object with matching properties.
   *
   * @param {Partial<LeekFile>} partial - An object with partial properties of `LeekFile`.
   */
  constructor(partial?: Partial<LeekFile>) {
    Object.assign(this, partial);
  }
}
