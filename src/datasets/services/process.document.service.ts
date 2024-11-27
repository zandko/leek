import { Injectable } from '@nestjs/common';

import { Document } from '@langchain/core/documents';
import pLimit from 'p-limit';

import { ConfigureAdapter } from '@leek/configure';
import { SegmentationType, IndexType, DOCUMENT_SECTION_DELIMITER } from '@leek/constants';
import { COSLoader, recursiveChunkSplitter } from '@leek/langchain';
import {
  createHash,
  extractFileExtension,
  removeExtraSpaces,
  removeUrlsEmails,
  trimLeadingPunctuation,
} from '@leek/utils';

import { LLMGeneratorService } from './llm.generator.service';
import { ProcessRuleDto } from '../dto/process.rule.dto';
import { DocumentProcessingFactory } from '../shared/utils/document.processing.factory';

@Injectable()
export class ProcessDocumentService {
  constructor(
    private readonly configureService: ConfigureAdapter,
    private readonly LLMGeneratorService: LLMGeneratorService,
  ) {}

  /**
   * Processes and segments documents based on provided rules.
   *
   * Extracts documents from Tencent COS, applies preprocessing, segmentation,
   * and optional QA generation.
   *
   * @param {string} key - The unique identifier (Key) of the document in Tencent COS.
   * @param {ProcessRuleDto} processRule - The rules for segmentation and preprocessing.
   * @param {string} [docForm] - Optional, the document form (e.g., QA index type).
   * @param {string} [docLanguage] - Optional, the language for generating QA pairs.
   * @returns {Promise<{ processedDocuments: Document[]; processedRule: ProcessRuleDto }>}
   * - The processed documents and applied rules.
   */
  async processDocumentsWithRules(
    key: string,
    processRule: ProcessRuleDto,
    docForm?: string,
    docLanguage?: string,
  ): Promise<{
    processedDocuments: Document[];
    processedRule: ProcessRuleDto;
  }> {
    // Step 1: Extract raw documents from COS
    const rawDocuments = await this.extractDocumentsFromCOS(key);

    // Step 2: Apply default rules if mode is automatic
    let { preProcessingRules, segmentation } = processRule;
    if (processRule.mode === SegmentationType.Automatic) {
      preProcessingRules = DocumentProcessingFactory.createDefaultPreProcessingRules();
      segmentation = DocumentProcessingFactory.createDefaultSegmentationRule();
    }

    // Step 3: Split documents based on rules or QA requirements
    let processedDocuments = rawDocuments;
    if (docForm === IndexType.QA && extractFileExtension(key) === 'xlsx') {
      processedDocuments = this.splitExcelForQA(rawDocuments);
    } else {
      processedDocuments = await this.splitDocumentsBySegmentationRules(rawDocuments, segmentation);
    }

    // Step 4: Generate QA pairs if document form is QA
    if (docForm === IndexType.QA && extractFileExtension(key) !== 'xlsx') {
      processedDocuments = await this.generateQaDocumentsForBatch(processedDocuments, docLanguage);
    }

    // Step 5: Clean documents based on preprocessing rules
    const cleanedDocuments = this.cleanDocumentsByPreprocessingRules(processedDocuments, preProcessingRules);

    return {
      processedDocuments: cleanedDocuments,
      processedRule: {
        preProcessingRules,
        segmentation,
        mode: processRule.mode,
      },
    };
  }

  /**
   * Cleans document content based on preprocessing rules.
   *
   * @param {Document[]} documents - The documents to clean.
   * @param {ProcessRuleDto['preProcessingRules']} preProcessingRules - The preprocessing rules to apply.
   * @returns {Document[]} - The cleaned documents.
   */
  cleanDocumentsByPreprocessingRules(
    documents: Document[],
    preProcessingRules: ProcessRuleDto['preProcessingRules'],
  ): Document[] {
    const ruleHandlers: Record<string, (text: string) => string> = {
      removeExtraSpaces,
      removeUrlsEmails,
    };

    // Filter enabled rules and collect the corresponding handler functions
    const enabledHandlers = preProcessingRules
      .filter((rule) => rule.enabled && ruleHandlers[rule.id])
      .map((rule) => ruleHandlers[rule.id]);

    // Filter enabled rules and collect the corresponding handler functions
    return documents.map((document) => {
      const updatedContent = enabledHandlers.reduce((content, handler) => handler(content), document.pageContent);
      const pageContent = trimLeadingPunctuation(updatedContent);
      return new Document({
        pageContent,
        metadata: {
          ...document.metadata,
          hash: createHash(pageContent),
        },
      });
    });
  }

  /**
   * Splits documents into smaller chunks based on segmentation rules.
   *
   * @param {Document[]} documents - The documents to split.
   * @param {ProcessRuleDto['segmentation']} segmentation - The segmentation rules to apply.
   * @returns {Promise<Document[]>} - The split documents.
   */
  async splitDocumentsBySegmentationRules(
    documents: Document[],
    segmentation: ProcessRuleDto['segmentation'],
  ): Promise<Document[]> {
    const splitDocs = await recursiveChunkSplitter(documents, {
      chunkSize: segmentation.maxTokens,
      chunkOverlap: segmentation.chunkOverlap,
      separators: segmentation.separator.split(','),
    });
    return splitDocs.map((doc) => new Document({ ...doc }));
  }

  /**
   * Splits Excel documents specifically for QA purposes.
   *
   * @param {Document[]} documents - The Excel documents to split.
   * @returns {Document[]} - The split documents with added metadata.
   */
  private splitExcelForQA(documents: Document[]): Document[] {
    return documents.map((doc) => {
      const [pageContent, answer] = doc.pageContent.split(DOCUMENT_SECTION_DELIMITER);
      return new Document({
        pageContent,
        metadata: {
          ...doc.metadata,
          answer,
          hash: createHash(pageContent),
        },
      });
    });
  }

  /**
   * Extracts documents from Tencent COS.
   *
   * @param {string} key - The unique key of the document in COS.
   * @returns {Promise<Document[]>} - The extracted documents.
   */
  async extractDocumentsFromCOS(key: string): Promise<Document[]> {
    const loader = new COSLoader({
      SecretId: this.configureService.TENCENT.SECRET_ID,
      SecretKey: this.configureService.TENCENT.SECRET_KEY,
      Bucket: this.configureService.TENCENT.COS_BUCKET,
      Region: this.configureService.TENCENT.COS_REGION,
      Key: key,
    });
    return loader.load();
  }

  /**
   * Generates QA pairs for a single document.
   *
   * @param {Document} document - The document to process.
   * @param {string} [docLanguage='English'] - The language for QA pairs.
   * @returns {Promise<Document[]>} - The generated QA documents.
   */
  async generateQaDocumentsForSingle(document: Document, docLanguage: string = 'English'): Promise<Document[]> {
    const qaPairs = await this.LLMGeneratorService.generateQaDocumentFromTextAndLanguage(
      document.pageContent,
      docLanguage,
    );
    return qaPairs.map(
      (qa) =>
        new Document({
          pageContent: qa.question,
          metadata: {
            ...document.metadata,
            answer: qa.answer,
          },
        }),
    );
  }

  /**
   * Generates QA pairs for a batch of documents.
   *
   * @param {Document[]} documents - The documents to process.
   * @param {string} [docLanguage='English'] - The language for QA pairs.
   * @returns {Promise<Document[]>} - The generated QA documents.
   */
  private async generateQaDocumentsForBatch(
    documents: Document[],
    docLanguage: string = 'English',
  ): Promise<Document[]> {
    const limit = pLimit(10); // Limit concurrency to avoid overloading resources
    const tasks = documents.map((doc) => limit(() => this.generateQaDocumentsForSingle(doc, docLanguage)));
    const results = await Promise.all(tasks);
    return results.flat();
  }
}
