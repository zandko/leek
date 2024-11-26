import { ApiProperty } from '@nestjs/swagger';

import { IsUUID, IsObject } from 'class-validator';

import { DataSourceType } from '@leek/constants';

import { IndexingEstimateProcessRuleDto } from './indexing-estimate-process-rule.dto';

interface DataSourceInfo {
  dataSourceType: string;
  fileInfo: {
    fileIds: string[];
  };
}

export class IndexingEstimateDto {
  @ApiProperty({
    description: '信息列表',
    type: 'object',
    properties: {
      dataSourceType: {
        type: 'string',
        description: '数据源类型',
        example: DataSourceType.File,
        enum: DataSourceType,
      },
      fileInfo: {
        type: 'object',
        description: '文件信息',
        properties: {
          fileIds: {
            type: 'array',
            items: { type: 'string' },
            description: '文件ID列表',
            example: ['4c688f1e-9248-4495-a78c-2d98cbcb93ad'],
          },
        },
      },
    },
  })
  @IsObject()
  dataSourceInfo: DataSourceInfo;

  @ApiProperty({
    description: '处理规则',
    type: IndexingEstimateProcessRuleDto,
  })
  @IsObject()
  processRule: IndexingEstimateProcessRuleDto;

  @ApiProperty({
    description: '数据集 ID',
    example: '71fab30b-aa39-4ab9-bb73-059c66963285',
  })
  @IsUUID()
  datasetId: string;
}
