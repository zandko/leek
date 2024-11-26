import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, Version } from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';

import { PaginationResponse, SwaggerDoc, UUIDParam } from '@leek/common';
import { PaginatedResult } from '@leek/interfaces';

import { LeekSegment } from '../domain/segment';
import { CreateDocumentSegmentDto } from '../dto/create-segment.dto';
import { QuerySegmentDto } from '../dto/query-segment.dto';
import { UpdateDocumentSegmentDto } from '../dto/update-segment.dto';
import { DocumentSegmentService } from '../services/document-segment.service';
import { ApiDatasetIdParam, ApiDocumentIdParam, ApiSegmentIdParam } from '../shared/decorators/api-params.decorators';

@ApiTags('Document Segments')
@Controller('datasets')
export class DocumentSegmentController {
  constructor(private readonly documentSegmentService: DocumentSegmentService) {}

  @Post(':dataset_id/documents/:document_id/segments')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('SEGMENT', 'CREATE', LeekSegment)
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async createSegment(
    @UUIDParam('dataset_id') datasetId: string,
    @UUIDParam('document_id') documentId: string,
    @Body() createDocumentSegmentDto: CreateDocumentSegmentDto,
  ): Promise<LeekSegment> {
    return this.documentSegmentService.createSegment(datasetId, documentId, createDocumentSegmentDto);
  }

  @Get(':dataset_id/documents/:document_id/segments/:segment_id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('SEGMENT', 'RETRIEVE', LeekSegment)
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  @ApiSegmentIdParam()
  async findSegmentById(@UUIDParam('segment_id') segmentId: string): Promise<LeekSegment> {
    return this.documentSegmentService.findSegmentById(segmentId);
  }

  @Get(':dataset_id/documents/:document_id/segments')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('SEGMENT', 'LIST', PaginationResponse(LeekSegment))
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  async findManySegmentsPaginatedByDocumentId(
    @UUIDParam('document_id') documentId: string,
    @Query() querySegmentDto?: QuerySegmentDto,
  ): Promise<PaginatedResult<LeekSegment>> {
    return this.documentSegmentService.findManySegmentsPaginatedByDocumentId(documentId, querySegmentDto);
  }

  @Delete(':dataset_id/documents/:document_id/segments/:segment_id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('SEGMENT', 'DELETE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  @ApiSegmentIdParam()
  async deleteSegmentById(
    @UUIDParam('dataset_id') datasetId: string,
    @UUIDParam('document_id') documentId: string,
    @UUIDParam('segment_id') segmentId: string,
  ): Promise<void> {
    await this.documentSegmentService.deleteSegmentById(datasetId, documentId, segmentId);
  }

  @Patch(':dataset_id/documents/:document_id/segments/:segment_id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('SEGMENT', 'UPDATE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  @ApiSegmentIdParam()
  @ApiNoContentResponse()
  async updateSegmentById(
    @UUIDParam('dataset_id') datasetId: string,
    @UUIDParam('document_id') documentId: string,
    @UUIDParam('segment_id') segmentId: string,
    @Body() updateDocumentSegmentDto: UpdateDocumentSegmentDto,
  ): Promise<void> {
    await this.documentSegmentService.updateSegmentById(datasetId, documentId, segmentId, updateDocumentSegmentDto);
  }

  @Patch(':dataset_id/documents/:document_id/segments/:segment_id/disable')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('SEGMENT', 'DISABLE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  @ApiSegmentIdParam()
  async disableSegmentById(@UUIDParam('segment_id') segmentId: string): Promise<void> {
    await this.documentSegmentService.disableSegmentById(segmentId);
  }

  @Patch(':dataset_id/documents/:document_id/segments/:segment_id/enable')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('SEGMENT', 'ENABLE')
  @ApiDatasetIdParam()
  @ApiDocumentIdParam()
  @ApiSegmentIdParam()
  async enableSegmentById(@UUIDParam('segment_id') segmentId: string): Promise<void> {
    await this.documentSegmentService.enableSegmentById(segmentId);
  }
}
