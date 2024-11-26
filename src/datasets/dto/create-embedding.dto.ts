import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateEmbeddingDto {
  @ApiProperty({
    description: '嵌入的哈希值',
    type: String,
    required: true,
  })
  @IsString()
  hash: string;

  @ApiProperty({
    description: '嵌入的内容文本',
    type: String,
    required: true,
  })
  @IsString()
  content: string;

  @ApiHideProperty()
  embedding?: string;

  @ApiProperty({
    description: '模型的名称',
  })
  @IsString()
  modelName: string;

  @ApiProperty({
    description: '提供者的名称',
  })
  @IsString()
  providerName: string;

  @ApiProperty({
    description: '类前缀，可能用于分类或标识',
  })
  @IsString()
  classPrefix: string;
}
