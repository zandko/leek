import { JSONLoader, JSONLinesLoader } from 'langchain/document_loaders/fs/json';

export type JSONLoaderOptions = string | string[];
export type JSONLinesLoaderOptions = string;

export class LeekJSONLoader extends JSONLoader {
  constructor(filePathOrBlob: string | Blob, pointers?: JSONLoaderOptions) {
    super(filePathOrBlob, pointers);
  }
}

export class LeekJSONLinesLoader extends JSONLinesLoader {
  constructor(filePathOrBlob: string | Blob, pointer: JSONLinesLoaderOptions) {
    super(filePathOrBlob, pointer);
  }
}
