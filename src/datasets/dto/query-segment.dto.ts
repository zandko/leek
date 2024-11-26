import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

import { PaginationDto } from '@leek/common';

export class QuerySegmentDto extends PartialType(PaginationDto) {
  @ApiPropertyOptional({
    description: 'Query string to search for in name, email, or phone fields',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({
    description: '段落是否启用',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  })
  @IsBoolean()
  enabled?: boolean = true;
}
