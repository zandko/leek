import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataSourceType, CreationType, IndexType } from '@leek/constants';

export class LeekDocument {
  @ApiProperty({
    description: '文档的唯一标识符',
    example: 'f607d5c1-f58e-44d1-b123-1e45ce3de984',
  })
  id: string;

  @ApiProperty({
    description: '知识库的唯一标识符',
    example: 'ca080e7e-9db2-4af8-9b78-b7615cf43272',
  })
  datasetId: string;

  @ApiProperty({
    description: '文档在知识库中的位置',
    example: 2,
  })
  position: number;

  @ApiProperty({
    description: '数据源类型',
    example: DataSourceType.File,
    enum: DataSourceType,
  })
  dataSourceType: string = DataSourceType.File;

  @ApiPropertyOptional({
    description: '数据源的详细信息，通常为JSON对象',
    example: '{"upload_file_id": "0162a2ca-11e9-4cc0-892b-b34047227dfc"}',
  })
  dataSourceInfo?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '知识库处理规则ID',
    example: 'ce9f2a1a-e49c-4660-9b87-7f0b3f4eefcc',
  })
  datasetProcessRuleId?: string;

  @ApiProperty({
    description: '文档名称',
    example: '600415_分析报告.pdf',
  })
  name: string;

  @ApiProperty({
    description: '文档的创建来源',
    example: CreationType.Web,
    enum: CreationType,
  })
  createdFrom: string = CreationType.Web;

  @ApiPropertyOptional({
    description: '创建此文档的 API 请求 ID',
    example: 'some-api-request-id',
  })
  createdApiRequestId?: string;

  @ApiPropertyOptional({
    description: '文件的唯一标识符',
    example: 'file-id-example',
  })
  fileId?: string;

  @ApiPropertyOptional({
    description: '文档的单词数',
    example: 1024,
  })
  wordCount?: number = 0;

  @ApiPropertyOptional({
    description: '文档的 token 数量',
    example: 5000,
  })
  tokens?: number = 0;

  @ApiPropertyOptional({
    description: '索引延迟时间，表示建立索引所花费的时间',
    example: 0.05,
  })
  indexingLatency?: number;

  @ApiPropertyOptional({
    description: '文档是否启用',
    example: true,
  })
  enabled?: boolean = true;

  @ApiPropertyOptional({
    description: '文档被禁用的时间',
    example: '2024-11-04T09:00:00.000Z',
  })
  disabledAt?: Date;

  @ApiPropertyOptional({
    description: '文档是否归档',
    example: false,
  })
  archived?: boolean = false;

  @ApiPropertyOptional({
    description: '文档归档的原因',
    example: 'No longer needed',
  })
  archivedReason?: string;

  @ApiPropertyOptional({
    description: '文档归档的时间',
    example: '2024-12-01T08:00:00.000Z',
  })
  archivedAt?: Date;

  @ApiPropertyOptional({
    description: '文档类型',
    example: 'PDF',
  })
  docType?: string;

  @ApiPropertyOptional({
    description: '文档的元数据，通常为JSON对象',
    example: '{"author": "John Doe", "subject": "Report"}',
  })
  docMetadata?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '文档的具体形式（如文本、QA）',
    example: IndexType.Paragraph,
    enum: IndexType,
  })
  docForm?: string = IndexType.Paragraph;

  @ApiPropertyOptional({
    description: '文档的语言',
    example: 'Chinese',
  })
  docLanguage?: string;

  @ApiProperty({
    description: '文档的创建时间',
    example: '2024-11-04T08:42:31.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '文档的更新时间',
    example: '2024-11-04T09:00:00.000Z',
  })
  updatedAt: Date;

  constructor(partial?: Partial<LeekDocument>) {
    Object.assign(this, partial);
  }
}
