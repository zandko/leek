import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsObject, IsOptional } from 'class-validator';

export class DocumentDto {
  @ApiProperty({
    description: '文档的内容，通常为字符串类型的文本。',
    example: 'This is a sample document content.',
  })
  @IsString()
  pageContent: string;

  @ApiPropertyOptional({
    description: '与文档关联的元数据信息，可以是任意键值对。',
    example: { author: 'John Doe', createdAt: '2024-01-01' },
  })
  @IsOptional()
  @IsObject()
  metadata: Record<string, any>;
}
