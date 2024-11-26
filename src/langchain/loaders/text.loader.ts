import { TextLoader } from 'langchain/document_loaders/fs/text';

export class LeekTextLoader extends TextLoader {
  constructor(filePathOrBlob: string | Blob) {
    super(filePathOrBlob);
  }
}
