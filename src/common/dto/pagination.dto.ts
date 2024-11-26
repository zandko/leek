import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'The current page number',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  currentPage?: number;

  @ApiPropertyOptional({
    description: 'The number of items per page',
    example: 10,
    type: Number,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  pageSize?: number;
}
