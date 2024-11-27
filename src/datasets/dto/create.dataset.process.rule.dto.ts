import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsString, IsJSON, IsUUID, IsOptional } from 'class-validator';

import { SegmentationType } from '@leek/constants';

import { DatasetProcessRuleDto } from './dataset.process.rule.dto';

export class CreateDatasetProcessRuleDto {
  @ApiProperty({
    description: '知识库的唯一标识符',
    example: 'ca080e7e-9db2-4af8-9b78-b7615cf43272',
  })
  @IsUUID()
  datasetId: string;

  @ApiPropertyOptional({
    description: '处理规则模式，值为 "automatic" 或 "custom"',
    enum: SegmentationType,
    example: SegmentationType.Automatic,
  })
  @IsString()
  mode: string;

  @ApiPropertyOptional({
    description: '自定义规则，采用 JSON 格式',
    type: DatasetProcessRuleDto,
    example: {},
  })
  @IsOptional()
  @IsJSON()
  rules?: LEEK.JsonValue;
}
