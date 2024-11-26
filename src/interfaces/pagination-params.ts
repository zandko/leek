/**
 * Type representing pagination parameters.
 */
export interface PaginationParams {
  /**
   * The current page number (1-based index).
   */
  currentPage: number;

  /**
   * The number of items per page.
   */
  pageSize: number;
}
