import { DocumentLoader } from 'langchain/document_loaders/base';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

import { LeekCSVLoader } from './csv.loader';
import { LeekDocxLoader } from './docx.loader';
import { LeekEPubLoader } from './epub.loader';
import { LeekExcelLoader } from './excel.loader';
import { LeekJSONLinesLoader, LeekJSONLoader, JSONLoaderOptions, JSONLinesLoaderOptions } from './json.loader';
import { LeekPDFLoader } from './pdf.loader';
import { LeekPPTXLoader } from './pptx.loader';
import { LeekTextLoader } from './text.loader';

type LoaderOptions = Record<string, any>;

/**
 * Factory function to create a document loader for a specific file type.
 *
 * This function maps file types to specific document loader implementations.
 *
 * @param {string} fileType - The type of the file (e.g., "pdf", "docx", "json").
 * @param {string} filePath - The path to the file.
 * @param {LoaderOptions} [options] - Optional loader-specific options.
 * @returns {DocumentLoader} - An instance of a document loader for the given file type.
 *
 * @throws {Error} If the file type is unsupported.
 */
export function createDocumentLoader(fileType: string, filePath: string, options?: LoaderOptions): DocumentLoader {
  switch (fileType) {
    case 'pdf':
      return new LeekPDFLoader(filePath, {
        splitPages: false,
      });
    case 'epub':
      return new LeekEPubLoader(filePath, {
        splitChapters: false,
      });
    case 'pptx':
      return new LeekPPTXLoader(filePath);
    case 'docx':
      return new LeekDocxLoader(filePath);
    case 'txt':
    case 'md':
      return new LeekTextLoader(filePath);
    case 'json':
      return new LeekJSONLoader(filePath, options as JSONLoaderOptions);
    case 'jsonl':
      return new LeekJSONLinesLoader(filePath, options as unknown as JSONLinesLoaderOptions);
    case 'csv':
      return new LeekCSVLoader(filePath, options);
    case 'xlsx':
      return new LeekExcelLoader(filePath, options);
    case 'zip':
      return createDirectoryLoader(filePath);
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}

/**
 * Creates a directory loader to handle multiple file types within a directory.
 *
 * This function associates specific file extensions with their corresponding loaders.
 *
 * @param {string} directoryPath - The path to the directory.
 * @returns {DirectoryLoader} - A loader configured to process the directory's contents.
 */
export function createDirectoryLoader(directoryPath: string): DirectoryLoader {
  const basePath = directoryPath.split('.')[0];

  return new DirectoryLoader(basePath, {
    '.pdf': (path) => createDocumentLoader('pdf', path),
    '.epub': (path) => createDocumentLoader('epub', path),
    '.pptx': (path) => createDocumentLoader('pptx', path),
    '.docx': (path) => createDocumentLoader('docx', path),
    '.txt': (path) => createDocumentLoader('txt', path),
    '.md': (path) => createDocumentLoader('md', path),
    '.json': (path) => createDocumentLoader('json', path),
    '.jsonl': (path) => createDocumentLoader('jsonl', path),
    '.csv': (path) => createDocumentLoader('csv', path),
    '.xlsx': (path) => createDocumentLoader('xlsx', path),
  });
}
