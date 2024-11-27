import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateDocumentSegmentDto {
  @ApiProperty({
    description: '段落内容',
    example: '这笔交易的人民币金额是多少？',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: '段落的关键词，通常为 JSON 对象',
    example: ['金额', '人民币', '交易'],
  })
  @IsOptional()
  @IsArray()
  keywords?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '段落是否启用',
    example: true,
  })
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({
    description: '段落的答案内容',
    example: '这笔交易的人民币金额是贰佰元整，即200元。',
  })
  @IsOptional()
  @IsString()
  answer?: string;
}
