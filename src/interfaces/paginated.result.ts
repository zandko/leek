/**
 * Interface representing a paginated response.
 */
export interface PaginatedResult<T> {
  /**
   * The array of data items for the current page.
   */
  data: T[];

  /**
   * The total number of items across all pages.
   */
  total: number;

  /**
   * The number of items per page.
   */
  pageSize: number;

  /**
   * The current page number (1-based).
   */
  currentPage: number;

  /**
   * The total number of pages.
   */
  totalPage: number;

  /**
   * Whether there is a next page.
   */
  hasNextPage: boolean;

  /**
   * Whether there is a previous page.
   */
  hasPrevPage: boolean;
}
