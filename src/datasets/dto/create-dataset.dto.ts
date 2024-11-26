import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsOptional, IsNotEmpty, IsObject } from 'class-validator';

import { DataSourceType } from '@leek/constants';

import { RetrievalModelDto } from './retrieval-model.dto';

export class CreateDatasetDto {
  @ApiProperty({
    description: '知识库名称',
    example: '用户行为知识库',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: '知识库的可选描述信息',
    example: '包含用户在电子商务平台上的点击、浏览和购买记录。',
  })
  @IsOptional()
  @IsString()
  description?: string;

  // @ApiPropertyOptional({
  //   description: '知识库提供方名称',
  //   example: 'vendor',
  //   default: 'vendor',
  // })
  // @IsString()
  // @IsOptional()
  // provider?: string = 'vendor';

  @ApiPropertyOptional({
    description: '数据源类型',
    example: DataSourceType.File,
    default: DataSourceType.File,
    enum: DataSourceType,
  })
  @IsOptional()
  @IsString()
  dataSourceType?: string;

  // @ApiPropertyOptional({
  //   description: '嵌入模型名称',
  //   example: 'text-embedding-3-large',
  //   default: 'text-embedding-3-large',
  // })
  // @IsString()
  // @IsOptional()
  // embeddingModel?: string = 'text-embedding-3-large';

  // @ApiPropertyOptional({
  //   description: '嵌入模型提供方',
  //   example: 'openai',
  //   default: 'openai',
  // })
  // @IsString()
  // @IsOptional()
  // embeddingModelProvider?: string = 'openai';

  @ApiPropertyOptional({
    description: '检索模型配置',
    type: RetrievalModelDto,
  })
  @IsOptional()
  @IsObject()
  retrievalModel?: LEEK.JsonValue;
}
