import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Source, PaginationResponse, UUIDParam, SwaggerDoc } from '@leek/common';
import { CreationType } from '@leek/constants';
import { PaginatedResult } from '@leek/interfaces';

import { LeekDocument } from '../domain/document';
import { CreateDocumentByFileDto } from '../dto/create.document.by.file.dto';
import { CreateDocumentByTextDto } from '../dto/create.document.by.text.dto';
import { QueryDocumentDto } from '../dto/query.document.dto';
import { UpdateDocumentNameDto } from '../dto/update.document.name.dto';
import { DocumentService } from '../services/document.service';
import { ApiDatasetIdParam, ApiDocumentIdParam } from '../shared/decorators/api.params.decorators';

@ApiTags('Dataset Documents')
@Controller('datasets')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post(':dataset_id/documents')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('DOCUMENT', 'LIST', PaginationResponse(LeekDocument))
  @ApiDatasetIdParam()
  async findManyDocumentsPaginatedByDatasetId(
    @UUIDParam('dataset_id') datasetId: string,
    @Body() queryDocumentDto?: QueryDocumentDto,
  ): Promise<PaginatedResult<LeekDocument>> {
    return this.documentService.findManyDocumentsPaginatedByDatasetId(datasetId, queryDocumentDto);
  }

  @Get(':dataset_id/documents/:document_id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('DOCUMENT', 'RETRIEVE', LeekDocument)
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async findDocumentById(@UUIDParam('document_id') documentId: string): Promise<LeekDocument> {
    return this.documentService.findDocumentById(documentId);
  }

  @Post(':dataset_id/document/create_by_text')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('DOCUMENT', 'CREATE', LeekDocument)
  @ApiDatasetIdParam()
  async createDocumentByText(
    @Body() createDocumentByTextDto: CreateDocumentByTextDto,
    @UUIDParam('dataset_id') datasetId: string,
    @Source(CreationType.Web) source: CreationType,
  ): Promise<LeekDocument> {
    return this.documentService.createDocumentByText(createDocumentByTextDto, datasetId, source);
  }

  @Post(':dataset_id/document/create_by_file')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('DOCUMENT', 'CREATE', LeekDocument)
  @ApiDatasetIdParam()
  async createDocumentByFile(
    @Body() createDocumentByFileDto: CreateDocumentByFileDto,
    @UUIDParam('dataset_id') datasetId: string,
    @Source(CreationType.Web) source: CreationType,
  ): Promise<LeekDocument> {
    return this.documentService.createDocumentByFile(createDocumentByFileDto, datasetId, source);
  }

  @Patch(':dataset_id/documents/:document_id/rename')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DOCUMENT', 'UPDATE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async renameDocumentById(
    @UUIDParam('document_id') documentId: string,
    @Body() updateDocumentNameDto: UpdateDocumentNameDto,
  ): Promise<void> {
    await this.documentService.renameDocumentById(documentId, updateDocumentNameDto);
  }

  @Delete(':dataset_id/documents/:document_id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DOCUMENT', 'DELETE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async deleteDocumentById(
    @UUIDParam('dataset_id') datasetId: string,
    @UUIDParam('document_id') documentId: string,
  ): Promise<void> {
    await this.documentService.deleteDocumentById(datasetId, documentId);
  }

  @Patch(':dataset_id/documents/:document_id/status/disable')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DOCUMENT', 'DISABLE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async disableDocumentById(@UUIDParam('document_id') documentId: string): Promise<void> {
    await this.documentService.disableDocumentById(documentId);
  }

  @Patch(':dataset_id/documents/:document_id/status/enable')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DOCUMENT', 'ENABLE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async enableDocumentById(@UUIDParam('document_id') documentId: string): Promise<void> {
    await this.documentService.enableDocumentById(documentId);
  }

  @Patch(':dataset_id/documents/:document_id/status/archive')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DOCUMENT', 'ARCHIVE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async archiveDocumentById(@UUIDParam('document_id') documentId: string): Promise<void> {
    await this.documentService.archiveDocumentById(documentId);
  }

  @Patch(':dataset_id/documents/:document_id/status/un_archive')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DOCUMENT', 'UNARCHIVE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async unArchiveDocumentById(@UUIDParam('document_id') documentId: string): Promise<void> {
    await this.documentService.unArchiveDocumentById(documentId);
  }
}
