import type { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function PaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({
      description: 'The data for the current page',
      type: [classReference],
    })
    data: T[];

    @ApiProperty({
      description: 'The total number of items available',
      example: 100,
    })
    total: number;

    @ApiProperty({
      description: 'The number of items per page',
      example: 10,
    })
    pageSize: number;

    @ApiProperty({
      description: 'The current page number',
      example: 1,
    })
    currentPage: number;

    @ApiProperty({
      description: 'The total number of pages available',
      example: 10,
    })
    totalPage: number;

    @ApiProperty({
      description: 'Indicates if there is a next page',
      example: true,
    })
    hasNextPage: boolean;

    @ApiProperty({
      description: 'Indicates if there is a previous page',
      example: false,
    })
    hasPrevPage: boolean;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `Pagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
