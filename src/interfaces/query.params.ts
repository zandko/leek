import { PaginationParams } from './pagination.params';

/**
 * Recursively makes all properties of `T` optional.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Query parameters for paginated and filtered queries.
 */
export type QueryParams<T> = Partial<PaginationParams> & {
  q?: string; // Optional keyword for filtering or searching
} & DeepPartial<T>;
