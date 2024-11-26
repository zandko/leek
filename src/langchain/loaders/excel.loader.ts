import { BaseDocumentLoader } from '@langchain/core/document_loaders/base';
import { Document } from '@langchain/core/documents';
import * as XLSX from 'xlsx';

import { DOCUMENT_SECTION_DELIMITER } from '@leek/constants';

/**
 * A custom loader for Excel files that extends the BaseDocumentLoader.
 *
 * This loader reads an Excel file, extracts content from a specified sheet (or the first sheet by default),
 * and converts rows into `Document` instances, where each row is treated as a document.
 */
export class LeekExcelLoader extends BaseDocumentLoader {
  private sheetNames: string | undefined;
  private separator: string;

  /**
   * Constructs a new instance of LeekExcelLoader.
   *
   * @param {string} filePath - The path to the Excel file to be loaded.
   * @param {object} [options] - Additional options for loading the file.
   * @param {string[]} [options.sheetNames] - The names of the sheets to load. Defaults to all sheets.
   * @param {string} [options.separator=DOCUMENT_SECTION_DELIMITER] - The separator used to join row cells into a single string.
   */
  constructor(
    public filePath: string,
    { sheetNames, separator = DOCUMENT_SECTION_DELIMITER }: { sheetNames?: string; separator?: string } = {},
  ) {
    super();
    this.sheetNames = sheetNames;
    this.separator = separator;
  }

  /**
   * Parses the content of a specific sheet into structured data.
   *
   * @protected
   * @param {XLSX.WorkSheet} sheet - The sheet object to parse.
   * @param {string} sheetName - The name of the sheet being processed.
   * @returns {Promise<{ pageContent: string; metadata?: object }[]>} - An array of parsed rows with content and metadata.
   */
  protected async parseSheet(sheet: XLSX.WorkSheet, sheetName: string): Promise<Document[]> {
    const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Exclude the header row if present
    const rowsWithoutHeader = jsonData.slice(1);

    return rowsWithoutHeader.map((row, index) => ({
      pageContent: row.join(this.separator),
      metadata: { rowIndex: index + 1, sheetName },
    }));
  }

  /**
   * Parses the content of the specified Excel sheet into structured data.
   *
   * @protected
   * @param {XLSX.WorkBook} workbook - The workbook object representing the loaded Excel file.
   * @returns {Promise<Document[]>} - An array of parsed rows with content and metadata.
   * @throws {Error} - If the specified sheet is not found or the workbook has no sheets.
   */
  protected async parse(workbook: XLSX.WorkBook): Promise<Document[]> {
    const sheetNames = this.sheetNames || workbook.SheetNames;
    if (!sheetNames.length) throw new Error('No sheets found in the Excel file.');

    const allParsedRows: Document[] = [];

    for (const sheetName of sheetNames) {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) throw new Error(`Sheet "${sheetName}" not found in the Excel file.`);

      const parsedRows = await this.parseSheet(sheet, sheetName);
      allParsedRows.push(...parsedRows);
    }

    return allParsedRows;
  }

  /**
   * Loads the Excel file and converts its content into an array of `Document` instances.
   *
   * @returns {Promise<Document[]>} - An array of `Document` instances created from the Excel rows.
   */
  async load(): Promise<Document[]> {
    const workbook = XLSX.readFile(this.filePath);

    const parsed = await this.parse(workbook);
    const metadata = { source: this.filePath };

    if (parsed.length === 0) return [];

    return parsed.map(
      (item) =>
        new Document({
          pageContent: item.pageContent,
          metadata: {
            ...metadata,
            ...item.metadata,
          },
        }),
    );
  }
}
