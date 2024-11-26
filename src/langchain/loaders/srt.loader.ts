import { SRTLoader } from '@langchain/community/document_loaders/fs/srt';

export class LeekSRTLoader extends SRTLoader {
  constructor(filePathOrBlob: string | Blob) {
    super(filePathOrBlob);
  }
}
