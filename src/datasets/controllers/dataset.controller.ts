import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SwaggerDoc, UUIDParam } from '@leek/common';

import { LeekDataset } from '../domain/dataset';
import { CreateDatasetDto } from '../dto/create-dataset.dto';
import { UpdateDatasetDto } from '../dto/update-dataset.dto';
import { DatasetService } from '../services/dataset.service';
import { ApiDatasetIdParam } from '../shared/decorators/api-params.decorators';

@ApiTags('Datasets')
@Controller('datasets')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc('DATASET', 'CREATE', LeekDataset)
  async createDataset(@Body() createDatasetDto: CreateDatasetDto): Promise<LeekDataset> {
    return this.datasetService.createDataset(createDatasetDto);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('DATASET', 'LIST', [LeekDataset])
  async findManyDatasets(): Promise<LeekDataset[]> {
    return this.datasetService.findManyDatasets();
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @SwaggerDoc('DATASET', 'RETRIEVE', LeekDataset)
  @ApiDatasetIdParam('id')
  async findDatasetById(@UUIDParam('id') id: string): Promise<LeekDataset> {
    return this.datasetService.findDatasetById(id);
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DATASET', 'UPDATE')
  @ApiDatasetIdParam('id')
  async updateDatasetById(@UUIDParam('id') id: string, @Body() updateDatasetDto: UpdateDatasetDto): Promise<void> {
    return this.datasetService.updateDatasetById(id, updateDatasetDto);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDoc('DATASET', 'DELETE')
  @ApiDatasetIdParam('id')
  async deleteDatasetById(@UUIDParam('id') id: string): Promise<void> {
    return this.datasetService.deleteDatasetById(id);
  }
}
