import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataSourceType, EmbeddingModels, EmbeddingProvider } from '@leek/constants';
import { uuid } from '@leek/utils';

import { RetrievalModelDto } from '../dto/retrieval-model.dto';
import { generateVectorClassPrefixByDatasetId } from '../shared/utils/generate-vector-class-prefix-by-dataset-id.util';

export class LeekDataset {
  @ApiProperty({
    description: '知识库的唯一标识符',
    example: '3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c',
  })
  id: string = uuid();

  @ApiProperty({
    description: '知识库名称',
    example: '用户行为知识库',
  })
  name: string;

  @ApiPropertyOptional({
    description: '知识库的可选描述信息',
    example: '包含用户在电子商务平台上的点击、浏览和购买记录。',
  })
  description?: string;

  @ApiPropertyOptional({
    description: '知识库提供方名称',
    example: 'vendor',
    default: 'vendor',
  })
  provider?: string = 'vendor';

  @ApiPropertyOptional({
    description: '数据源类型',
    example: DataSourceType.File,
    enum: DataSourceType,
  })
  dataSourceType?: string;

  @ApiPropertyOptional({
    description: '索引结构配置',
    example: {
      type: 'pgvector',
      vectorStore: {
        classPrefix: generateVectorClassPrefixByDatasetId('3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c'),
      },
    },
  })
  indexStruct?: LEEK.JsonValue;

  @ApiPropertyOptional({
    description: '嵌入模型名称',
    example: EmbeddingModels[EmbeddingProvider.OpenAI].TEXT_EMBEDDING_3_SMALL,
  })
  embeddingModel?: string = EmbeddingModels[EmbeddingProvider.OpenAI].TEXT_EMBEDDING_3_SMALL;

  @ApiPropertyOptional({
    description: '嵌入模型提供方',
    example: EmbeddingProvider.OpenAI,
  })
  embeddingModelProvider?: string = EmbeddingProvider.OpenAI;

  @ApiPropertyOptional({
    description: '检索模型配置',
    type: RetrievalModelDto,
  })
  retrievalModel?: LEEK.JsonValue;

  @ApiProperty({
    description: '知识库创建时间',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '知识库更新时间',
    example: '2023-01-02T00:00:00Z',
  })
  updatedAt: Date;

  constructor(partial?: Partial<LeekDataset>) {
    Object.assign(this, partial);
  }
}
