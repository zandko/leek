import { LeekDataset } from '../../domain/dataset';

/**
 * Abstract repository interface for datasets.
 *
 * Defines the methods for interacting with datasets in the data storage layer.
 *
 * **Method Order Guideline**:
 * 1. **Create**: Methods that create new records.
 * 2. **Read**: Methods that retrieve data (e.g., findMany, findById).
 * 3. **Update**: Methods that modify existing records.
 * 4. **Delete**: Methods that remove records.
 *
 * When adding new methods, place them under the appropriate CRUD category
 * to maintain logical organization and consistency.
 */
export abstract class DatasetRepository {
  /**
   * Create a new dataset.
   *
   * This method creates a new dataset record in the data store.
   * The input data should exclude `createdAt`, and `updatedAt` fields,
   * as these are typically auto-generated by the storage mechanism.
   *
   * @param {Omit<LeekDataset, 'createdAt' | 'updatedAt'>} data - The content of the dataset.
   * @returns {Promise<LeekDataset>} - The newly created dataset.
   */
  abstract createDataset(data: Omit<LeekDataset, 'createdAt' | 'updatedAt'>): Promise<LeekDataset>;

  /**
   * Retrieve all datasets.
   *
   * This method fetches all dataset records stored in the data store.
   *
   * @returns {Promise<LeekDataset[]>} - An array containing all datasets.
   */
  abstract findManyDatasets(): Promise<LeekDataset[]>;

  /**
   * Retrieve a dataset by its unique ID.
   *
   * This method fetches a single dataset identified by its unique ID.
   * Returns `null` if no matching dataset is found.
   *
   * @param {string} id - The unique identifier of the dataset.
   * @returns {Promise<LEEK.Nullable<LeekDataset>>} - The matching dataset, or `null` if not found.
   */
  abstract findDatasetById(id: string): Promise<LEEK.Nullable<LeekDataset>>;

  /**
   * Update a dataset by its unique ID.
   *
   * This method updates a dataset record in the data store using the provided ID and partial update data.
   *
   * @param {string} id - The unique identifier of the dataset to update.
   * @param {Partial<LeekDataset>} data - An object containing the fields to be updated.
   * @returns {Promise<void>} - Resolves when the update operation is complete.
   */
  abstract updateDatasetById(id: string, data: Partial<LeekDataset>): Promise<void>;

  /**
   * Delete a dataset by its unique ID.
   *
   * This method deletes a dataset record identified by its unique ID.
   *
   * @param {string} id - The unique identifier of the dataset to delete.
   * @returns {Promise<void>} - Resolves when the deletion operation is complete.
   */
  abstract deleteDatasetById(id: string): Promise<void>;
}
