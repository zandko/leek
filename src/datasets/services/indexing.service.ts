import { Injectable } from '@nestjs/common';

import { FilesService } from '@leek/files/files.service';

import { ProcessDocumentService } from './process-document.service';
import { IndexingEstimateDto } from '../dto/indexing-estimate.dto';
import { ProcessRuleDto } from '../dto/process-rule.dto';
import { ResponseIndexingEstimateDto } from '../dto/response-indexing-estimate.dto';

@Injectable()
export class IndexingService {
  constructor(
    private readonly filesService: FilesService,
    private readonly processDocumentService: ProcessDocumentService,
  ) {}

  /**
   * Estimates the result of document indexing.
   *
   * This method processes a document based on the provided file information and preprocessing rules,
   * and returns an estimation of chunk count and content preview.
   *
   * @param {IndexingEstimateDto} indexingEstimateDto - DTO containing file information and processing rules.
   * @returns {Promise<ResponseIndexingEstimateDto>} - The estimated result including chunk count and chunk previews.
   *
   * @throws {Error} - If the file is not found or document processing fails.
   */
  async indexingEstimate(indexingEstimateDto: IndexingEstimateDto): Promise<ResponseIndexingEstimateDto> {
    const { dataSourceInfo, processRule } = indexingEstimateDto;

    // Validate and retrieve the file ID
    const fileId = dataSourceInfo.fileInfo.fileIds[0];
    if (!fileId) {
      throw new Error('File ID is missing in the provided file information.');
    }

    // Fetch file details
    const file = await this.filesService.findFileById(fileId);

    if (!file) {
      throw new Error(`File with ID "${fileId}" not found.`);
    }

    // Extract processing rules
    const { mode, rules } = processRule;

    const processRuleDto: ProcessRuleDto = rules as unknown as ProcessRuleDto;

    // Process documents with the specified rules
    const { processedDocuments } = await this.processDocumentService.processDocumentsWithRules(file.key, {
      mode,
      preProcessingRules: processRuleDto.preProcessingRules,
      segmentation: processRuleDto.segmentation,
    });

    // Extract content previews from processed documents
    const chunkPreview = processedDocuments.map((doc) => doc.pageContent);

    // Return the indexing estimate result
    return {
      chunkCount: processedDocuments.length,
      chunkPreview,
    };
  }
}
