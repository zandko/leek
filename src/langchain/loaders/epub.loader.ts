import { EPubLoader } from '@langchain/community/document_loaders/fs/epub';

type EPubLoaderOptions = {
  splitChapters?: boolean | undefined;
};

export class LeekEPubLoader extends EPubLoader {
  constructor(filePathOrBlob: string, options?: EPubLoaderOptions) {
    super(filePathOrBlob, options);
  }
}
