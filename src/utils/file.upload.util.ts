import { Request } from 'express';

import { FILE_UPLOAD_ALLOWED_EXTENSIONS } from '@leek/constants';

/**
 * A file filter for validating uploaded files based on their extensions.
 *
 * This filter checks if the uploaded file's extension is in the list of allowed extensions.
 * If the file type is unsupported, the upload is rejected.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @param {Express.Multer.File} file - The file being uploaded.
 * @param {(error: Error | null, acceptFile: boolean) => void} callback - A callback to indicate
 * whether the file is accepted or rejected.
 */
export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  // Extract the file extension
  const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
  // Validate the file extension
  if (!FILE_UPLOAD_ALLOWED_EXTENSIONS.includes(fileExtension || '')) {
    return callback(new Error('Unsupported file type'), false);
  }
  callback(null, true);
};
