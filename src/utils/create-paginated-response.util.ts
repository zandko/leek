import { PaginatedResult, PaginationParams } from '@leek/interfaces';

/**
 * Generates a paginated response structure.
 *
 * @template T - The type of data being paginated.
 * @param data - An array of data items to include in the paginated response.
 * @param pagination - An object containing details of the current pagination state.
 * @param pagination.currentPage - The current page number (1-based).
 * @param pagination.pageSize - The number of items per page.
 * @param pagination.count - The total number of items across all pages.
 * @returns A structured object containing the paginated data and metadata.
 */
export function createPaginatedResponse<T = any>(
  data: T[],
  { currentPage, pageSize, count }: PaginationParams & { count: number },
): PaginatedResult<T> {
  const totalPage = Math.ceil(count / pageSize);

  return {
    data,
    total: count,
    pageSize,
    currentPage,
    totalPage,
    hasNextPage: currentPage < totalPage,
    hasPrevPage: currentPage > 1,
  };
}
