import { PaginatedResult } from '@leek/interfaces';

import { createPaginatedResponse } from './create-paginated-response.util';

/**
 * Interface defining the parameters required for a paginated query.
 * This generic interface allows flexibility for different models and query structures.
 *
 * @template Where - The type of the `where` clause for filtering.
 * @template OrderBy - The type of the `orderBy` clause for sorting.
 * @template Select - (Optional) The type defining the fields to select.
 * @template Include - (Optional) The type defining related entities to include.
 */
export interface PaginationQueryParams<Where, OrderBy, Select = undefined, Include = undefined> {
  where?: Where; // Filtering conditions
  orderBy?: OrderBy; // Sorting conditions
  currentPage?: number; // Current page number, defaults to 1 if not provided
  pageSize?: number; // Number of records per page, defaults to 10 if not provided
  select?: Select; // Fields to select from the model (optional)
  include?: Include; // Related entities to include in the query (optional)
}

/**
 * Interface defining the required methods for a Prisma model to support paginated queries.
 * This generic interface ensures compatibility with Prisma's query structure.
 *
 * @template Model - The type representing the data model (e.g., `User`, `Post`).
 * @template Where - The type of the `where` clause for filtering.
 * @template OrderBy - The type of the `orderBy` clause for sorting.
 * @template Select - (Optional) The type defining the fields to select.
 * @template Include - (Optional) The type defining related entities to include.
 */
export interface PrismaModel<Model, Where, OrderBy, Select = undefined, Include = undefined> {
  /**
   * Executes a query to fetch multiple records based on the specified parameters.
   *
   * @param args.where - Filtering conditions.
   * @param args.orderBy - Sorting conditions.
   * @param args.skip - Number of records to skip (for pagination).
   * @param args.take - Number of records to take (for pagination).
   * @param args.select - Fields to select (optional).
   * @param args.include - Related entities to include (optional).
   * @returns A promise resolving to an array of records.
   */
  findMany: (args: {
    where?: Where;
    orderBy?: OrderBy;
    skip?: number;
    take?: number;
    select?: Select;
    include?: Include;
  }) => Promise<Model[]>;
  /**
   * Executes a query to count the total number of records matching the specified conditions.
   *
   * @param args.where - Filtering conditions.
   * @returns A promise resolving to the count of matching records.
   */
  count: (args: { where?: Where }) => Promise<number>;
}

/**
 * A utility function for creating a paginated query.
 * This function handles pagination logic and returns a structured response with metadata.
 *
 * @template Model - The type representing the data model (e.g., `User`, `Post`).
 * @template Where - The type of the `where` clause for filtering.
 * @template OrderBy - The type of the `orderBy` clause for sorting.
 * @template Select - (Optional) The type defining the fields to select.
 * @template Include - (Optional) The type defining related entities to include.
 *
 * @param prismaModel - The Prisma model object with `findMany` and `count` methods.
 * @returns A function that executes a paginated query and returns the results with pagination metadata.
 */
export function createPaginatedQuery<Model, Where, OrderBy, Select = undefined, Include = undefined>(
  prismaModel: PrismaModel<Model, Where, OrderBy, Select, Include>,
) {
  /**
   * Executes a paginated query.
   *
   * @param params.where - Filtering conditions (optional).
   * @param params.orderBy - Sorting conditions (optional).
   * @param params.currentPage - Current page number (defaults to 1 if not provided).
   * @param params.pageSize - Number of records per page (defaults to 10 if not provided).
   * @param params.select - Fields to select from the model (optional).
   * @param params.include - Related entities to include in the query (optional).
   * @returns A promise resolving to a structured paginated response.
   */
  return async ({
    where,
    orderBy,
    currentPage = 1,
    pageSize = 10,
    select,
    include,
  }: PaginationQueryParams<Where, OrderBy, Select, Include>): Promise<PaginatedResult<Model>> => {
    const safePage = Math.max(currentPage, 1);
    const safePageSize = Math.max(pageSize, 1);
    const skip = (safePage - 1) * safePageSize;

    const [data, count] = await Promise.all([
      prismaModel.findMany({
        where,
        orderBy,
        skip,
        take: safePageSize,
        select,
        include,
      }),
      prismaModel.count({ where }),
    ]);

    return createPaginatedResponse<Model>(data, { currentPage: safePage, pageSize: safePageSize, count });
  };
}
