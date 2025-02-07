import * as fsDefault from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import COS from 'cos-nodejs-sdk-v5';
import { BaseDocumentLoader } from 'langchain/document_loaders/base';

import { extractFileExtensionUtil } from '@leek/utils';

import { createDocumentLoader } from './document.loader';

/**
 * Parameters required to initialize the COSLoader.
 */
export interface COSLoaderParams {
  SecretId: string;
  SecretKey: string;
  Bucket: string;
  Region: string;
  Key: string;

  fs?: typeof fsDefault;
}

/**
 * A custom document loader for fetching files from Tencent Cloud COS.
 * Downloads the file, processes it using the appropriate document loader, and cleans up temporary files.
 */
export class COSLoader extends BaseDocumentLoader {
  private readonly SecretId: string;
  private readonly SecretKey: string;
  private readonly Bucket: string;
  private readonly Region: string;
  private readonly Key: string;
  private readonly _fs: typeof fsDefault;

  /**
   * Initializes the COSLoader with the required parameters.
   *
   * @param {COSLoaderParams} params - Configuration for connecting to COS and handling the file.
   */
  constructor({ SecretId, SecretKey, Bucket, Region, Key, fs = fsDefault }: COSLoaderParams) {
    super();
    this.SecretId = SecretId;
    this.SecretKey = SecretKey;
    this.Bucket = Bucket;
    this.Region = Region;
    this.Key = Key;
    this._fs = fs;
  }

  /**
   * Loads the file from COS, processes it with the appropriate loader, and returns the processed documents.
   *
   * @returns {Promise<Document[]>} - The processed documents.
   * @throws {Error} - If downloading or processing the file fails.
   */
  public async load() {
    const filePath = this.createTempFilePath();

    try {
      await this.downloadFile(filePath);
      const loader = createDocumentLoader(extractFileExtensionUtil(this.Key), filePath);
      return await loader.load();
    } catch (error) {
      throw new Error(`Failed to process file ${this.Key} from COS bucket ${this.Bucket}: ${error.message}`);
    } finally {
      this.cleanupTempFile(filePath);
    }
  }

  /**
   * Creates a temporary file path for downloading the COS file.
   *
   * @private
   * @returns {string} - The path to the temporary file.
   */
  private createTempFilePath(): string {
    const tempDir = this._fs.mkdtempSync(path.join(os.tmpdir(), 's3fileloader-'));
    const extension = extractFileExtensionUtil(this.Key);
    return path.join(tempDir, `${Date.now()}.${extension}`);
  }

  /**
   * Downloads the file from COS to a temporary location.
   *
   * @private
   * @param {string} filePath - The destination file path for the downloaded file.
   * @returns {Promise<void>} - Resolves when the file is successfully downloaded.
   * @throws {Error} - If the file download fails.
   */
  private async downloadFile(filePath: string): Promise<void> {
    const cosClient = new COS({
      SecretId: this.SecretId,
      SecretKey: this.SecretKey,
    });

    return new Promise<void>((resolve, reject) => {
      cosClient.getObject(
        {
          Bucket: this.Bucket,
          Region: this.Region,
          Key: this.Key,
          Output: this._fs.createWriteStream(filePath),
        },
        (err) => {
          if (err) {
            reject(new Error(`Failed to download file: ${err.message}`));
          } else {
            resolve();
          }
        },
      );
    });
  }

  /**
   * Cleans up the temporary file after processing is complete.
   *
   * @private
   * @param {string} filePath - The path to the temporary file.
   */
  private cleanupTempFile(filePath: string): void {
    try {
      if (this._fs.existsSync(filePath)) {
        this._fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.warn(`Failed to clean up temporary file ${filePath}: ${error.message}`);
    }
  }
}
