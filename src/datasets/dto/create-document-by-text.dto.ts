import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsString, IsOptional, ValidateNested } from 'class-validator';

import { ProcessRuleDto } from './process-rule.dto';

export class CreateDocumentByTextDto {
  @ApiProperty({
    description: '文档名称',
    example: 'text',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '文档内容',
    example: 'This is the content of the document.',
  })
  @IsString()
  text: string;

  @ApiPropertyOptional({
    description: '处理规则配置，包括模式和具体规则',
    type: () => ProcessRuleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProcessRuleDto)
  processRule?: ProcessRuleDto;
}
