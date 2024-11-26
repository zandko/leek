import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags, ApiParam } from '@nestjs/swagger';

import { SwaggerDoc, UUIDParam } from '@leek/common';
import { FILE_UPLOAD_MAX_SIZE } from '@leek/constants';
import { fileFilter } from '@leek/utils';

import { LeekFile } from './domain/files';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadTextFileDto } from './dto/upload-text-file.dto';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload_file')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('FILE', 'UPLOAD', LeekFile)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: FILE_UPLOAD_MAX_SIZE },
      fileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadFileDto: UploadFileDto): Promise<LeekFile> {
    return this.filesService.uploadFile(file, uploadFileDto.description);
  }

  @Post('upload_text_file')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('FILE', 'UPLOAD', LeekFile)
  async uploadTextFile(@Body() UploadTextFileDto: UploadTextFileDto): Promise<LeekFile> {
    return this.filesService.uploadTextFile(
      UploadTextFileDto.name,
      UploadTextFileDto.text,
      UploadTextFileDto.description,
    );
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('FILE', 'RETRIEVE', LeekFile)
  @ApiParam({
    name: 'id',
    description: 'The unique identifier (UUID) of the file to retrieve.',
  })
  async findFileById(@UUIDParam('id') id: string): Promise<LeekFile> {
    return this.filesService.findFileById(id);
  }
}
