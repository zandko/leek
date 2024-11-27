import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { IsString, IsOptional, IsBoolean } from 'class-validator';

import { PaginationDto } from '@leek/common';
import { CreationType, IndexType } from '@leek/constants';

export class QueryDocumentDto extends PartialType(PaginationDto) {
  @ApiPropertyOptional({
    description: 'Query string to search for in name, email, or phone fields',
    type: String,
    example: 'john',
  })
  @IsOptional()
  @IsString()
  q?: string;

  // @ApiPropertyOptional({
  //   description: '数据源类型',
  //   example: DataSourceType.File,
  //   enum: DataSourceType,
  // })
  // @IsOptional()
  // @IsString()
  // dataSourceType?: string;

  @ApiPropertyOptional({
    description: '文档的创建来源',
    example: CreationType.Web,
    enum: CreationType,
  })
  @IsOptional()
  @IsString()
  createdFrom?: string;

  @ApiPropertyOptional({
    description: '文档是否启用',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean = true;

  @ApiPropertyOptional({
    description: '文档是否归档',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  archived?: boolean = false;

  // @ApiPropertyOptional({
  //   description: '文档的类型',
  //   example: 'PDF',
  // })
  // @IsOptional()
  // @IsString()
  // docType?: string;

  @ApiPropertyOptional({
    description: '文档的形式（如文本、QA）',
    example: IndexType.Paragraph,
    enum: IndexType,
  })
  @IsOptional()
  @IsString()
  docForm?: string;

  // @ApiPropertyOptional({
  //   description: '文档的语言',
  //   example: 'Chinese',
  // })
  // @IsOptional()
  // @IsString()
  // docLanguage?: string;
}
