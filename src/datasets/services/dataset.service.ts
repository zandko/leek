import { Injectable } from '@nestjs/common';

import { Transactional } from '@leek/common';

import { LeekDataset } from '../domain/dataset';
import { CreateDatasetDto } from '../dto/create-dataset.dto';
import { UpdateDatasetDto } from '../dto/update-dataset.dto';
import { DatasetProcessRuleRepository } from '../infrastructure/persistence/dataset-process-rule.repository';
import { DatasetRepository } from '../infrastructure/persistence/dataset.repository';
import { DocumentSegmentRepository } from '../infrastructure/persistence/document-segment.repository';
import { DocumentRepository } from '../infrastructure/persistence/document.repository';
import { EmbeddingRepository } from '../infrastructure/persistence/embedding.repository';
import { DatasetFactory } from '../shared/utils/dataset.factory';
import { generateVectorClassPrefixByDatasetId } from '../shared/utils/generate-vector-class-prefix-by-dataset-id.util';

@Injectable()
export class DatasetService {
  constructor(
    private readonly datasetRepository: DatasetRepository,
    private readonly documentRepository: DocumentRepository,
    private readonly documentSegmentRepository: DocumentSegmentRepository,
    private readonly datasetProcessRuleRepository: DatasetProcessRuleRepository,
    private readonly embeddingRepository: EmbeddingRepository,
  ) {}

  /**
   * Create a new dataset record.
   *
   * This method creates a new dataset in the database based on the provided DTO.
   *
   * @param {CreateDatasetDto} createDatasetDto - The DTO containing the data necessary for creating the dataset.
   * @returns {Promise<LeekDataset>} - The created dataset object.
   */
  async createDataset(createDatasetDto: CreateDatasetDto): Promise<LeekDataset> {
    const { name, description, retrievalModel, dataSourceType } = createDatasetDto;

    const dataset = new LeekDataset();

    dataset.name = name;
    dataset.dataSourceType = dataSourceType;
    dataset.description = description || DatasetFactory.createDefaultDescription(name);
    dataset.indexStruct = DatasetFactory.createDefaultIndexStruct(dataset.id);
    dataset.retrievalModel = retrievalModel || DatasetFactory.createDefaultRetrievalModel();

    return this.datasetRepository.createDataset({ ...dataset, id: dataset.id });
  }

  /**
   * Retrieve all datasets.
   *
   * Fetches all dataset records stored in the database.
   *
   * @returns {Promise<LeekDataset[]>} - An array of dataset objects.
   */
  async findManyDatasets(): Promise<LeekDataset[]> {
    return this.datasetRepository.findManyDatasets();
  }

  /**
   * Retrieve a dataset by ID.
   *
   * Fetches a single dataset by its unique identifier. If the dataset does not exist, it returns `null`.
   *
   * @param {string} id - The unique identifier of the dataset.
   * @returns {Promise<LEEK.Nullable<LeekDataset>>} - The matching dataset object, or `null` if not found.
   */
  async findDatasetById(id: string): Promise<LEEK.Nullable<LeekDataset>> {
    return this.datasetRepository.findDatasetById(id);
  }

  /**
   * Update an existing dataset by ID.
   *
   * Updates the specified dataset record with the provided update data.
   *
   * @param {string} id - The unique identifier of the dataset to update.
   * @param {UpdateDatasetDto} updateDatasetDto - The DTO containing the updated data for the dataset.
   * @returns {Promise<void>} - Resolves when the update operation is completed.
   */
  async updateDatasetById(id: string, updateDatasetDto: UpdateDatasetDto): Promise<void> {
    await this.datasetRepository.updateDatasetById(id, updateDatasetDto);
  }

  /**
   * Delete a dataset and its associated data.
   *
   * Removes the dataset and all related entities, including documents, segments, embeddings, and process rules.
   * The operation is executed as a transactional operation to ensure data consistency.
   *
   * @param {string} id - The unique identifier of the dataset to delete.
   * @returns {Promise<void>} - Resolves when the deletion operation is completed.
   */
  @Transactional()
  async deleteDatasetById(id: string): Promise<void> {
    await this.datasetProcessRuleRepository.deleteRulesByDatasetId(id);
    await this.embeddingRepository.deleteManyEmbeddingsByClassPrefix(generateVectorClassPrefixByDatasetId(id));
    await this.documentSegmentRepository.deleteManySegmentsByDatasetId(id);
    await this.documentRepository.deleteManyDocumentsByDatasetId(id);
    await this.datasetRepository.deleteDatasetById(id);
  }
}
