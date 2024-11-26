import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsString, IsObject, ValidateNested, IsOptional } from 'class-validator';

import { RetrievalModelDto } from './retrieval-model.dto';

export class SimilaritySearchDto {
  @ApiProperty({
    description: '搜索查询字符串，用户输入的关键字或文本内容。',
    example: '如何提高代码质量？',
  })
  @IsString()
  query: string;

  @ApiProperty({
    description: '检索模型的参数配置。',
    type: RetrievalModelDto,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RetrievalModelDto)
  retrievalModel?: RetrievalModelDto;
}
