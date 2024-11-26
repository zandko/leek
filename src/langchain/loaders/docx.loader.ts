import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';

export class LeekDocxLoader extends DocxLoader {
  constructor(filePathOrBlob: string) {
    super(filePathOrBlob);
  }
}
