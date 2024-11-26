import { Body, Controller, HttpCode, HttpStatus, Post, Version } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { IndexingEstimateDto } from '../dto/indexing-estimate.dto';
import { ResponseIndexingEstimateDto } from '../dto/response-indexing-estimate.dto';
import { IndexingService } from '../services/indexing.service';

@ApiTags('Indexing')
@Controller('datasets')
export class IndexingController {
  constructor(private readonly indexingService: IndexingService) {}

  @Post('indexing_estimate')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Estimate Indexing Results',
    description: 'Estimates the indexing results based on the uploaded file content.',
  })
  @ApiCreatedResponse({
    type: ResponseIndexingEstimateDto,
  })
  async indexingEstimate(@Body() indexingEstimateDto: IndexingEstimateDto): Promise<ResponseIndexingEstimateDto> {
    return this.indexingService.indexingEstimate(indexingEstimateDto);
  }
}
