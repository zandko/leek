import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

type PDFLoaderOptions = {
  splitPages?: boolean | undefined;
  pdfjs?: any;
  parsedItemSeparator?: string | undefined;
};

export class LeekPDFLoader extends PDFLoader {
  constructor(filePathOrBlob: string | Blob, options?: PDFLoaderOptions) {
    super(filePathOrBlob, options);
  }
}
