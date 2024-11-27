import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class RetrievalModelDto {
  @ApiPropertyOptional({
    description: '检索结果的最大条数，默认为 3',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  topK?: number;

  @ApiPropertyOptional({
    description: '匹配分数的最低阈值，仅分数高于该值的结果会被返回',
    example: 0.5,
  })
  @IsOptional()
  @IsNumber()
  scoreThreshold: number;

  @ApiPropertyOptional({
    description: '是否启用分数阈值过滤功能',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  scoreThresholdEnabled: boolean;
}
