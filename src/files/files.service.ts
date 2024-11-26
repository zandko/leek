import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import COS from 'cos-nodejs-sdk-v5';
import * as XLSX from 'xlsx';

import { ConfigureAdapter } from '@leek/configure';
import { createHash, extractFileExtension, MimeTypeNames, uuid } from '@leek/utils';

import { LeekFile } from './domain/files';
import { FilesRepository } from './infrastructure/persistence/files.repository';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name); // Initialize logger

  constructor(
    private readonly configureService: ConfigureAdapter,
    private readonly filesRepository: FilesRepository,
  ) {}

  /**
   * Uploads a file to Tencent COS and stores its metadata in the repository.
   * @param {Express.Multer.File} file - The file to be uploaded.
   * @param {string} [description] - Optional description of the file.
   * @returns {Promise<LeekFile>} The metadata of the uploaded file.
   * @throws {BadRequestException} If the file is invalid or not supported.
   * @throws {InternalServerErrorException} If the upload to Tencent COS fails.
   */
  async uploadFile(file: Express.Multer.File, description?: string): Promise<LeekFile> {
    if (!file) {
      this.logger.error('File upload failed: file is either unsupported or exceeds size limits.');
      throw new BadRequestException('File upload failed: unsupported file type or file size exceeds limit.');
    }

    const { buffer, originalname, mimetype } = file;
    const extension = extractFileExtension(originalname);
    return this.uploadFileToCos(buffer, originalname, extension, mimetype, description);
  }

  /**
   * Uploads plain text content as a file to Tencent COS.
   * @param {string} originalname - The original name of the text file.
   * @param {string} text - The text content to be uploaded.
   * @param {string} [description] - Optional description of the text file.
   * @returns {Promise<LeekFile>} The metadata of the uploaded text file.
   * @throws {InternalServerErrorException} If the upload to Tencent COS fails.
   */
  async uploadTextFile(originalname: string, text: string, description?: string): Promise<LeekFile> {
    // Temporary file creation for text content
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 's3fileloader-'));
    const filePath = path.join(tempDir, `${originalname}.txt`);

    fs.writeFileSync(filePath, text, 'utf8');

    const buffer = fs.readFileSync(filePath);

    try {
      return await this.uploadFileToCos(buffer, originalname, 'txt', MimeTypeNames.TextPlain, description);
    } catch (error) {
      this.logger.error(`Text file upload failed for ${originalname}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Text file upload failed, please try again later.');
    } finally {
      // Clean up temporary file after upload attempt
      fs.unlinkSync(filePath);
    }
  }

  /**
   * Handles the upload of a file buffer to Tencent COS and stores its metadata.
   * @private
   * @param {Buffer} buffer - The file buffer to upload.
   * @param {string} originalname - The original name of the file.
   * @param {string} extension - The file extension.
   * @param {string} mimetype - The MIME type of the file.
   * @param {string} [description] - Optional description of the file.
   * @returns {Promise<LeekFile>} The metadata of the uploaded file.
   * @throws {InternalServerErrorException} If the upload fails.
   */
  private async uploadFileToCos(
    buffer: Buffer,
    originalname: string,
    extension: string,
    mimetype: string,
    description?: string,
  ): Promise<LeekFile> {
    if (extension === 'xlsx') {
      await this.validateExcel(buffer); // Validate Excel file structure if it's an XLSX file
    }

    const tencentCos = new COS({
      SecretId: this.configureService.TENCENT.SECRET_ID,
      SecretKey: this.configureService.TENCENT.SECRET_KEY,
    });

    const hash = createHash(buffer);

    const storedFile = await this.filesRepository.findFileByHash(hash);

    if (storedFile) return storedFile;

    const fileKey = `leek/upload_files/${uuid()}.${extension}`;
    const fileName = Buffer.from(originalname, 'latin1').toString('utf-8');

    try {
      await tencentCos.putObject({
        Bucket: this.configureService.TENCENT.COS_BUCKET,
        Region: this.configureService.TENCENT.COS_REGION,
        Key: fileKey,
        Body: buffer,
      });
    } catch (error) {
      this.logger.error(`File upload to COS failed for ${originalname}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to upload file to cloud storage. Please try again later.');
    }

    return this.filesRepository.createFile(
      new LeekFile({
        key: fileKey,
        name: fileName,
        size: buffer.length,
        extension,
        mimeType: mimetype,
        hash,
        description,
      }),
    );
  }

  /**
   * Validates the structure of an Excel file.
   * @private
   * @param {Buffer} buffer - The buffer of the Excel file.
   * @throws {BadRequestException} If the Excel file structure is invalid.
   */
  private async validateExcel(buffer: Buffer): Promise<void> {
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    if (!sheetName) {
      throw new BadRequestException('No sheet found in the Excel file.');
    }

    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (rows.length === 0) {
      throw new BadRequestException('The Excel file is empty.');
    }

    const headers = rows[0];

    // Ensure the first two columns are 'QUESTION' and 'ANSWER'
    if (headers[0] !== 'QUESTION' || headers[1] !== 'ANSWER') {
      throw new BadRequestException('Excel headers must be: "QUESTION" in the first column, "ANSWER" in the second.');
    }

    // Ensure each row has only two columns (QUESTION, ANSWER)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!Array.isArray(row) || row.length > 2) {
        throw new BadRequestException(`Row ${i + 1} is invalid. Only two columns are allowed: QUESTION and ANSWER.`);
      }
    }
  }

  /**
   * Finds a file by its ID in the repository.
   * @param {string} id - The ID of the file to find.
   * @returns {Promise<LeekFile | null>} The file metadata or null if not found.
   */
  async findFileById(id: string): Promise<LEEK.Nullable<LeekFile>> {
    return this.filesRepository.findFileById(id);
  }
}
