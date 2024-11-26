import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsOptional } from 'class-validator';

export class SegmentationRuleDto {
  @ApiPropertyOptional({
    description: '自定义分段标识符，仅允许一个分隔符，默认为 \\n',
    example: '\n\n',
  })
  @IsOptional()
  @IsString()
  separator?: string;

  @ApiPropertyOptional({
    description: '每段最大 token 数量，默认为 500',
    example: 500,
  })
  @IsOptional()
  maxTokens?: number;

  @ApiPropertyOptional({
    description: '每段之间重叠的 token 数量，默认为 50，用于确保上下文的连续性',
    example: 50,
  })
  @IsOptional()
  chunkOverlap?: number;
}
