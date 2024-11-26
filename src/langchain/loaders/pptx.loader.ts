import { PPTXLoader } from '@langchain/community/document_loaders/fs/pptx';

export class LeekPPTXLoader extends PPTXLoader {
  constructor(filePathOrBlob: string | Blob) {
    super(filePathOrBlob);
  }
}
