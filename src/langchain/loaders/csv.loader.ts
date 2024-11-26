import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';

type CSVLoaderOptions = {
  column?: string;
  separator?: string;
};

export class LeekCSVLoader extends CSVLoader {
  constructor(filePathOrBlob: string | Blob, options?: CSVLoaderOptions | string) {
    super(filePathOrBlob, options);
  }
}
