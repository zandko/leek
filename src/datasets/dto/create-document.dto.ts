import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt, IsUUID, IsJSON, IsBoolean, IsDate, IsNumber } from 'class-validator';

import { DataSourceType, CreationType, IndexType } from '@leek/constants';

export class CreateDocumentDto {
  @ApiProperty({
    description: '知识库的唯一标识符',
    example: 'ca080e7e-9db2-4af8-9b78-b7615cf43272',
  })
  @IsUUID()
  datasetId: string;

  @ApiProperty({
    description: '文档在知识库中的位置',
    example: 2,
  })
  @IsInt()
  position: number;

  @ApiProperty({
    description: '数据源类型',
    example: DataSourceType.File,
    enum: DataSourceType,
  })
  @IsString()
  dataSourceType: string;

  @ApiProperty({
    description: '文档名称',
    example: '600415_分析报告.pdf',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '文档的创建来源',
    example: CreationType.Web,
    enum: CreationType,
  })
  @IsString()
  createdFrom: string;

  @ApiPropertyOptional({
    description: '数据源的详细信息，通常为JSON对象',
    example: { uploadFileId: '0162a2ca-11e9-4cc0-892b-b34047227dfc' },
  })
  @IsOptional()
  @IsJSON()
  dataSourceInfo?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '知识库处理规则 ID',
    example: 'ce9f2a1a-e49c-4660-9b87-7f0b3f4eefcc',
  })
  @IsOptional()
  @IsUUID()
  datasetProcessRuleId?: string;

  @ApiPropertyOptional({
    description: '创建此文档的 API 请求 ID',
    example: 'some-api-request-id',
  })
  @IsOptional()
  @IsString()
  createdApiRequestId?: string;

  @ApiPropertyOptional({
    description: '文件的唯一标识符',
    example: 'file-id-example',
  })
  @IsOptional()
  @IsString()
  fileId?: string;

  @ApiPropertyOptional({
    description: '文档的单词数',
    example: 1024,
  })
  @IsOptional()
  @IsInt()
  wordCount?: number;

  @ApiPropertyOptional({
    description: '文档的 token 数量',
    example: 5000,
  })
  @IsOptional()
  @IsInt()
  tokens?: number;

  @ApiPropertyOptional({
    description: '索引延迟时间，表示建立索引所花费的时间',
    example: 0.05,
  })
  @IsOptional()
  @IsNumber()
  indexingLatency?: number;

  @ApiProperty({
    description: '文档是否启用',
    example: true,
  })
  @IsBoolean()
  enabled: boolean = true;

  @ApiPropertyOptional({
    description: '文档被禁用的时间',
    example: '2024-11-04T09:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  disabledAt?: Date;

  @ApiProperty({
    description: '文档是否归档',
    example: false,
  })
  @IsBoolean()
  archived: boolean = false;

  @ApiPropertyOptional({
    description: '文档归档的原因',
    example: 'No longer needed',
  })
  @IsOptional()
  @IsString()
  archivedReason?: string;

  @ApiPropertyOptional({
    description: '文档归档的时间',
    example: '2024-12-01T08:00:00.000Z',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  archivedAt?: Date;

  @ApiPropertyOptional({
    description: '文档的类型',
    example: 'PDF',
  })
  @IsOptional()
  @IsString()
  docType?: string;

  @ApiPropertyOptional({
    description: '文档的元数据，通常为 JSON 对象',
    example: { author: 'John Doe', subject: 'Report' },
  })
  @IsOptional()
  @IsJSON()
  docMetadata?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '文档的形式（如文本、QA）',
    example: IndexType.Paragraph,
    enum: IndexType,
  })
  @IsOptional()
  @IsString()
  docForm?: string;

  @ApiPropertyOptional({
    description: '文档的语言',
    example: 'Chinese',
  })
  @IsOptional()
  @IsString()
  docLanguage?: string;
}
