import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class UpdateDocumentNameDto {
  @ApiProperty({
    description: '文档名称',
    example: '600415_分析报告.pdf',
  })
  @IsString()
  name: string;
}
