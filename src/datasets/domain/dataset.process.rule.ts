import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { SegmentationType } from '@leek/constants';

import { DatasetProcessRuleDto } from '../dto/dataset.process.rule.dto';

export class LeekDatasetProcessRule {
  @ApiProperty({
    description: '规则的唯一标识符',
    example: '3f29e2b7-8c9e-4d47-bbfa-a4a7f7b81b9c',
  })
  id: string;

  @ApiProperty({
    description: '知识库的唯一标识符',
    example: 'ca080e7e-9db2-4af8-9b78-b7615cf43272',
  })
  datasetId: string;

  @ApiProperty({
    description: '处理规则模式，值为 "automatic" 或 "custom"',
    enum: SegmentationType,
    example: SegmentationType.Automatic,
  })
  mode: string = SegmentationType.Automatic;

  @ApiPropertyOptional({
    description: '自定义规则，采用 JSON 格式',
    type: DatasetProcessRuleDto,
  })
  rules?: LEEK.JsonValue;

  @ApiProperty({
    description: '规则的创建时间',
    example: '2024-11-04T08:42:31.000Z',
  })
  createdAt: Date;

  constructor(partial?: Partial<LeekDatasetProcessRule>) {
    Object.assign(this, partial);
  }
}
