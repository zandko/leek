import {
  UnstructuredLoader,
  UnstructuredLoaderOptions,
  UnstructuredMemoryLoaderOptions,
} from '@langchain/community/document_loaders/fs/unstructured';

export class LeekUnstructuredLoader extends UnstructuredLoader {
  constructor(
    filepathOrBufferOptions: string | UnstructuredMemoryLoaderOptions,
    unstructuredOptions?: UnstructuredLoaderOptions | string,
  ) {
    super(filepathOrBufferOptions, unstructuredOptions);
  }
}
