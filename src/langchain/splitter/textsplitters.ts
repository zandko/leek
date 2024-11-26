import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter, type RecursiveCharacterTextSplitterParams } from 'langchain/text_splitter';

/**
 * Splits the provided documents into smaller chunks.
 *
 * @param {Document[]} documents - The list of documents to be split.
 * @param {Partial<RecursiveCharacterTextSplitterParams>} fields - Optional parameters to configure the splitter.
 * @returns {Promise<Document[]>} - A promise that resolves with the split documents.
 */
export async function recursiveChunkSplitter(
  documents: Document[],
  fields: Partial<RecursiveCharacterTextSplitterParams> = {},
): Promise<Document[]> {
  const { chunkSize = 500, chunkOverlap = 50, separators = ['\n\n'] } = fields;
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators,
  });
  return await splitter.splitDocuments(documents);
}
