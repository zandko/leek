import { PreProcessingRuleDto } from '@leek/datasets/dto/pre-processing-rule.dto';
import { SegmentationRuleDto } from '@leek/datasets/dto/segmentation-rule.dto';

/**
 * Factory class for creating default configurations related to document processing.
 *
 * This class provides static methods to generate default values for document
 * segmentation and pre-processing rules.
 */
export class DocumentProcessingFactory {
  /**
   * Creates the default segmentation rule for documents.
   *
   * The segmentation rule includes a separator, maximum tokens, and chunk overlap for
   * splitting text into manageable segments.
   *
   * @returns {SegmentationRuleDto} - The default segmentation rule.
   */
  static createDefaultSegmentationRule(): SegmentationRuleDto {
    return {
      separator: '\n\n, 。, . , ,',
      maxTokens: 500,
      chunkOverlap: 50,
    };
  }

  /**
   * Creates the default pre-processing rules for cleaning document data.
   *
   * Pre-processing rules include operations like removing extra spaces or URLs.
   *
   * @returns {PreProcessingRuleDto[]} - The default pre-processing rules.
   */
  static createDefaultPreProcessingRules(): PreProcessingRuleDto[] {
    return [
      {
        id: 'removeExtraSpaces',
        enabled: true,
      },
      {
        id: 'removeUrlsEmails',
        enabled: false,
      },
    ];
  }
}
