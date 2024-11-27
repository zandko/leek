import { ApiProperty } from '@nestjs/swagger';

import { EmbeddingModels, EmbeddingProvider } from '@leek/constants';
import { uuid } from '@leek/utils';

import { generateVectorClassPrefixByDatasetId } from '../shared/utils/generate.vector.class.prefix.by.dataset.id.util';

export class LeekEmbedding {
  @ApiProperty({
    description: '嵌入对象的唯一标识符',
    example: 'f607d5c1-f58e-44d1-b123-1e45ce3de985',
  })
  id: string = uuid();

  @ApiProperty({
    description: '嵌入的哈希值',
    example: 'c6bd97a16ea91fc05155d82af79516c013c5488f175191372bbb07c7031c77fc',
  })
  hash: string;

  @ApiProperty({
    description: '嵌入的向量数据',
    example: [102, 9102, 111, 222],
  })
  embedding: number[];

  @ApiProperty({
    description: '嵌入模型名称',
    example: EmbeddingModels[EmbeddingProvider.OpenAI].TEXT_EMBEDDING_3_SMALL,
  })
  modelName: string = EmbeddingModels[EmbeddingProvider.OpenAI].TEXT_EMBEDDING_3_SMALL;

  @ApiProperty({
    description: '嵌入模型提供方',
    example: EmbeddingProvider.OpenAI,
  })
  providerName: string = EmbeddingProvider.OpenAI;

  @ApiProperty({
    description: '类前缀，可能用于分类或标识',
    example: generateVectorClassPrefixByDatasetId('3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c'),
  })
  classPrefix: string;

  @ApiProperty({
    description: '嵌入对象创建时间',
    example: '2024-11-04T08:42:31.000Z',
  })
  createdAt: Date;

  constructor(partial?: Partial<LeekEmbedding>) {
    Object.assign(this, partial);
  }
}
