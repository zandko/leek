import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsOptional, ValidateNested, IsUUID, IsString } from 'class-validator';

import { IndexType } from '@leek/constants';

import { ProcessRuleDto } from './process-rule.dto';

export class CreateDocumentByFileDto {
  @ApiPropertyOptional({
    description: '源文档 ID，用于重新上传或更新文档',
    example: 'some-uuid',
  })
  @IsOptional()
  @IsUUID()
  originalDocumentId?: string;

  @ApiPropertyOptional({
    description: '处理规则配置，包括模式和具体规则，新增操作时为必填',
    type: () => ProcessRuleDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProcessRuleDto)
  processRule?: ProcessRuleDto;

  @ApiPropertyOptional({
    description: '文档的形式（如文本、PDF）',
    example: IndexType.Paragraph,
    enum: IndexType,
  })
  @IsOptional()
  @IsString()
  docForm?: string;

  @ApiPropertyOptional({
    description: '文档的语言',
    example: 'Chinese',
  })
  @IsOptional()
  @IsString()
  docLanguage?: string;
}
