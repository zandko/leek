import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { Transactional } from '@leek/common';
import { PaginatedResult } from '@leek/interfaces';
import { encodeAsync, initEmbeddings } from '@leek/langchain';
import { TransactionManager } from '@leek/prisma';
import { uuid, createHash } from '@leek/utils';

import { JiebaKeywordService } from './jieba.keyword.service';
import { LeekEmbedding } from '../domain/embedding';
import { LeekSegment } from '../domain/segment';
import { CreateDocumentSegmentDto } from '../dto/create.segment.dto';
import { QuerySegmentDto } from '../dto/query.segment.dto';
import { UpdateDocumentSegmentDto } from '../dto/update.segment.dto';
import { DocumentRepository } from '../infrastructure/persistence/document.repository';
import { DocumentSegmentRepository } from '../infrastructure/persistence/document.segment.repository';
import { EmbeddingRepository } from '../infrastructure/persistence/embedding.repository';
import { generateVectorClassPrefixByDatasetId } from '../shared/utils/generate.vector.class.prefix.by.dataset.id.util';

@Injectable()
export class DocumentSegmentService {
  private readonly logger = new Logger(DocumentSegmentService.name);

  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly documentSegmentRepository: DocumentSegmentRepository,
    private readonly embeddingRepository: EmbeddingRepository,
    private readonly jiebaKeywordService: JiebaKeywordService,
    private readonly transactionManager: TransactionManager,
  ) {}

  /**
   * Updates word count and token count for a document.
   *
   * Adjusts the document's statistics based on the provided deltas.
   *
   * @private
   * @param {string} documentId - The ID of the document to update.
   * @param {number} wordCountDelta - The change in word count (positive or negative).
   * @param {number} tokensDelta - The change in token count (positive or negative).
   * @throws {InternalServerErrorException} - If the update operation fails.
   */
  private async updateWordCountAndTokens(
    documentId: string,
    wordCountDelta: number,
    tokensDelta: number,
  ): Promise<void> {
    try {
      const storedDocument = await this.documentRepository.findDocumentById(documentId);
      if (!storedDocument) throw new Error(`Document not found for ID: ${documentId}`);
      const updatedWordCount = storedDocument.wordCount + wordCountDelta;
      const updatedTokens = storedDocument.tokens + tokensDelta;
      await this.documentRepository.updateWordCountAndTokensById(documentId, updatedWordCount, updatedTokens);
    } catch (error) {
      this.logger.error(`Failed to update document statistics for document ID: ${documentId}`, error.stack);
      throw new InternalServerErrorException('Error updating document statistics.');
    }
  }

  /**
   * Creates a new document segment.
   *
   * This method generates a new segment for a document, updates the document's statistics,
   * and registers embeddings for the new segment.
   *
   * @param {string} datasetId - The ID of the dataset the segment belongs to.
   * @param {string} documentId - The ID of the document the segment belongs to.
   * @param {CreateDocumentSegmentDto} createDocumentSegmentDto - DTO containing segment data.
   * @returns {Promise<LeekSegment>} - The created segment.
   * @throws {BadRequestException} - If a segment with the same content already exists.
   * @throws {InternalServerErrorException} - If the segment creation process fails.
   */
  @Transactional()
  async createSegment(
    datasetId: string,
    documentId: string,
    createDocumentSegmentDto: CreateDocumentSegmentDto,
  ): Promise<LeekSegment> {
    const { content } = createDocumentSegmentDto;

    // Generate a unique hash for the segment content
    const indexNodeHash = createHash(content);

    // Check if a segment with the same hash already exists
    const storedSegment = await this.documentSegmentRepository.findSegmentByDatasetDocumentAndHash(
      datasetId,
      documentId,
      indexNodeHash,
    );

    if (storedSegment) {
      throw new BadRequestException('A segment with the same content already exists.');
    }

    try {
      // Calculate tokens and position for the new segment
      const tokens = await encodeAsync(content);
      const maxPosition = await this.documentSegmentRepository.countSegmentsByDocumentId(datasetId);

      // Extract keywords from the segment content
      const keywords = this.jiebaKeywordService.extractKeywordsWithSubtokens(content);

      const newSegment = new LeekSegment({
        ...createDocumentSegmentDto,
        datasetId,
        documentId,
        position: maxPosition ? maxPosition + 1 : 1,
        tokens,
        wordCount: content.length,
        keywords,
        indexNodeId: uuid(),
        indexNodeHash,
      });

      // Save the new segment to the repository
      const createdSegment = await this.documentSegmentRepository.createSegment(newSegment);

      // Update the document's word and token counts
      await this.updateWordCountAndTokens(documentId, content.length, tokens);

      const embeddingInstance = initEmbeddings();
      const embedding = await embeddingInstance.embedQuery(content);

      // Register embeddings for the new segment
      await this.embeddingRepository.registerEmbeddings([
        new LeekEmbedding({
          classPrefix: generateVectorClassPrefixByDatasetId(datasetId),
          hash: indexNodeHash,
          embedding,
        }),
      ]);

      return createdSegment;
    } catch (error) {
      this.logger.error('Error creating document segment.', error.stack);
      throw new InternalServerErrorException('Failed to create document segment.');
    }
  }

  /**
   * Retrieves a document segment by its ID.
   *
   * @param {string} segmentId - The ID of the segment to retrieve.
   * @returns {Promise<LeekSegment>} - The found segment.
   * @throws {BadRequestException} - If the segment does not exist.
   */
  async findSegmentById(segmentId: string): Promise<LEEK.Nullable<LeekSegment>> {
    const storedSegment = await this.documentSegmentRepository.findSegmentById(segmentId);

    if (!storedSegment) {
      throw new BadRequestException(`Segment with ID ${segmentId} not found.`);
    }

    return storedSegment;
  }

  /**
   * Retrieves paginated segments for a document.
   *
   * @param {string} documentId - The ID of the document.
   * @param {QuerySegmentDto} [querySegmentDto] - Optional query parameters for pagination.
   * @returns {Promise<PaginatedResult<LeekSegment>>} - The paginated list of segments.
   */
  async findManySegmentsPaginatedByDocumentId(
    documentId: string,
    querySegmentDto?: QuerySegmentDto,
  ): Promise<PaginatedResult<LeekSegment>> {
    return this.documentSegmentRepository.findManySegmentsPaginatedByDocumentId(documentId, querySegmentDto);
  }

  /**
   * Updates a document segment.
   *
   * This method replaces the content of an existing segment, adjusts associated document
   * statistics, and updates embeddings for the segment.
   *
   * @param {string} datasetId - The ID of the dataset.
   * @param {string} documentId - The ID of the document.
   * @param {string} segmentId - The ID of the segment to update.
   * @param {UpdateDocumentSegmentDto} updateDocumentSegmentDto - DTO containing updated data.
   * @throws {BadRequestException} - If the segment does not exist.
   * @throws {InternalServerErrorException} - If the update operation fails.
   */
  @Transactional()
  async updateSegmentById(
    datasetId: string,
    documentId: string,
    segmentId: string,
    updateDocumentSegmentDto: UpdateDocumentSegmentDto,
  ): Promise<void> {
    const { content } = updateDocumentSegmentDto;

    // Generate a unique hash for the updated segment content
    const indexNodeHash = createHash(content);

    // Fetch the existing segment to be updated
    const storedSegment = await this.documentSegmentRepository.findSegmentById(segmentId);

    if (!storedSegment) {
      throw new BadRequestException('Segment not found or no changes detected.');
    }

    try {
      // Calculate tokens for the updated content
      const tokens = await encodeAsync(content);

      const updatedSegment = new LeekSegment({
        ...storedSegment,
        ...updateDocumentSegmentDto,
        tokens,
        wordCount: content.length,
        indexNodeHash,
      });

      // Update the segment in the repository
      await this.documentSegmentRepository.updateSegmentById(segmentId, updatedSegment);

      // Adjust the document's word and token counts based on the difference
      await this.updateWordCountAndTokens(
        documentId,
        content.length - storedSegment.wordCount,
        tokens - storedSegment.tokens,
      );

      const embeddingInstance = initEmbeddings();
      const embedding = await embeddingInstance.embedQuery(content);

      // Updated embeddings for the updated segment
      await this.embeddingRepository.updateEmbeddingsByHashAndClassPrefix([
        new LeekEmbedding({
          classPrefix: generateVectorClassPrefixByDatasetId(datasetId),
          hash: indexNodeHash,
          embedding,
        }),
      ]);
    } catch (error) {
      this.logger.error('Error updating document segment.', error.stack);
      throw new InternalServerErrorException('Failed to update document segment.');
    }
  }

  /**
   * Deletes a document segment by its ID.
   *
   * Removes the segment, updates document statistics, and deletes associated embeddings.
   *
   * @param {string} datasetId - The dataset ID.
   * @param {string} documentId - The document ID.
   * @param {string} segmentId - The segment ID.
   * @throws {BadRequestException} - If the segment does not exist.
   * @throws {InternalServerErrorException} - If the deletion process fails.
   */
  @Transactional()
  async deleteSegmentById(datasetId: string, documentId: string, segmentId: string): Promise<void> {
    // Fetch the segment to be deleted
    const storedSegment = await this.documentSegmentRepository.findSegmentById(segmentId);

    if (!storedSegment) {
      throw new BadRequestException('Segment not found for deletion.');
    }
    try {
      // Remove embeddings associated with the segment
      await this.embeddingRepository.deleteManyEmbeddingsByHashAndClassPrefix(
        storedSegment.indexNodeHash,
        generateVectorClassPrefixByDatasetId(datasetId),
      );
      // Delete the segment from the repository
      await this.documentSegmentRepository.deleteSegmentById(segmentId);
      // Update the document's word and token counts
      await this.updateWordCountAndTokens(documentId, storedSegment.wordCount, storedSegment.tokens);
    } catch (error) {
      this.logger.error(`Error deleting segment with ID ${segmentId}.`, error.stack);
      throw new InternalServerErrorException('Failed to delete document segment.');
    }
  }

  /**
   * Disables a document segment.
   *
   * Marks the segment as disabled and sets the disabled timestamp.
   *
   * @param {string} segmentId - The ID of the segment to disable.
   */
  async disableSegmentById(segmentId: string) {
    await this.documentSegmentRepository.updateSegmentById(segmentId, {
      enabled: false,
      disabledAt: new Date(),
    });
  }

  /**
   * Enables a document segment.
   *
   * Marks the segment as enabled.
   *
   * @param {string} segmentId - The ID of the segment to enable.
   */
  async enableSegmentById(segmentId: string) {
    await this.documentSegmentRepository.updateSegmentById(segmentId, {
      enabled: true,
    });
  }
}
