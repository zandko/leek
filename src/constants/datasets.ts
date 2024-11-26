/**
 * Enum representing the segmentation type for data processing.
 */
export enum SegmentationType {
  /**
   * Automatic segmentation using predefined rules or machine learning models.
   */
  Automatic = 'automatic',

  /**
   * User-defined segmentation based on custom inputs or criteria.
   */
  Custom = 'custom',
}

export enum IndexType {
  /**
   * Index for paragraph-level text processing.
   */
  Paragraph = 'text_model',
  /**
   * Index for question-answering tasks.
   */
  QA = 'qa_model',
  /**
   * Index for summarization tasks.
   */
  Summary = 'summary_index',
}

export enum DataSourceType {
  /**
   * Data uploaded from a local file.
   */
  File = 'upload_file',

  /**
   * Data imported from Notion, a productivity and collaboration platform.
   */
  Notion = 'notion_import',

  /**
   * Data crawled from a specified website.
   */
  Web = 'website_crawl',
}

/**
 * Enum representing the type of resource creation source.
 */
export enum CreationType {
  /**
   * Resource created from a web interface interaction.
   */
  Web = 'web',

  /**
   * Resource created programmatically via an API call.
   */
  API = 'api',
}

/**
 * Constant defining the delimiter used to split document sections.
 */
export const DOCUMENT_SECTION_DELIMITER = '<<<>>>';
