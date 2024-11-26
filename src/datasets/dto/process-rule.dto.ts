import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';

import { SegmentationType } from '@leek/constants';

import { PreProcessingRuleDto } from './pre-processing-rule.dto';
import { SegmentationRuleDto } from './segmentation-rule.dto';

export class ProcessRuleDto {
  @ApiProperty({
    description: '清洗、分段模式，automatic 为自动，custom 为自定义',
    enum: SegmentationType,
    example: SegmentationType.Automatic,
  })
  @IsString()
  mode: string;

  @ApiPropertyOptional({
    description: '自定义规则，自动模式下为空',
    type: () => [PreProcessingRuleDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PreProcessingRuleDto)
  preProcessingRules?: PreProcessingRuleDto[];

  @ApiPropertyOptional({
    description: '分段规则配置',
    type: () => SegmentationRuleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SegmentationRuleDto)
  segmentation?: SegmentationRuleDto;
}
