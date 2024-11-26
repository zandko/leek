import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeekSegment {
  @ApiProperty({
    description: '段落的唯一标识符',
    example: '84e8b555-f864-4d9e-9f16-cc8e6900a3ae',
  })
  id: string;

  @ApiProperty({
    description: '知识库的唯一标识符',
    example: 'ca080e7e-9db2-4af8-9b78-b7615cf43272',
  })
  datasetId: string;

  @ApiProperty({
    description: '关联的文档的唯一标识符',
    example: '6a220f65-82d2-4873-8228-0f634138ea0b',
  })
  documentId: string;

  @ApiProperty({
    description: '段落在文档中的位置',
    example: 13,
  })
  position: number;

  @ApiProperty({
    description: '段落内容',
    example: '这笔交易的人民币金额是多少？',
  })
  content: string;

  @ApiProperty({
    description: '段落的单词数',
    example: 14,
  })
  wordCount: number;

  @ApiProperty({
    description: '段落的 token 数量',
    example: 15,
  })
  tokens: number;

  @ApiPropertyOptional({
    description: '段落的关键词，通常为 JSON 对象',
    example: ['金额', '人民币', '交易'],
  })
  keywords?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '索引节点 ID',
    example: '33531e13-d8ff-4c5a-96fe-2f36436ed7c0',
  })
  indexNodeId?: string;

  @ApiPropertyOptional({
    description: '索引节点哈希值',
    example: 'c1e4e0560f31b6164bfb9ec9e91536a7581e80b6b96e788d93bededbb2d3d7f6',
  })
  indexNodeHash?: string;

  @ApiPropertyOptional({
    description: '段落的命中次数',
    example: 0,
  })
  hitCount?: number = 0;

  @ApiPropertyOptional({
    description: '段落是否启用',
    example: true,
  })
  enabled?: boolean = true;

  @ApiPropertyOptional({
    description: '段落被禁用的时间',
    example: '2024-11-04T09:00:00.000Z',
  })
  disabledAt?: Date;

  @ApiPropertyOptional({
    description: '段落的状态',
    example: 'completed',
  })
  status?: string = 'completed';

  @ApiPropertyOptional({
    description: '段落索引过程中的错误信息',
    example: 'Error encountered during indexing',
  })
  error?: string;

  @ApiPropertyOptional({
    description: '段落的答案内容',
    example: '这笔交易的人民币金额是贰佰元整，即200元。',
  })
  answer?: string;

  @ApiProperty({
    description: '段落的创建时间',
    example: '2024-11-04T08:42:31.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '段落的更新时间',
    example: '2024-11-04T09:00:00.000Z',
  })
  updatedAt: Date;

  constructor(partial?: Partial<LeekSegment>) {
    Object.assign(this, partial);
  }
}
