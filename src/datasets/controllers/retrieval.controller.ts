import { Body, Controller, HttpCode, HttpStatus, Post, Sse, Version } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ConversationDto } from '@leek/assistants/dto/conversation.dto';
import { UUIDParam } from '@leek/common';

import { DocumentDto } from '../dto/document.dto';
import { SimilaritySearchDto } from '../dto/similarity.search.dto';
import { RetrievalService } from '../services/retrieval.service';
import { ApiDatasetIdParam } from '../shared/decorators/api.params.decorators';

@ApiTags('Knowledge Retrieval')
@Controller('datasets')
export class RetrievalController {
  constructor(private readonly retrievalService: RetrievalService) {}

  @Post(':dataset_id/retrieve')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve Knowledge Base Content',
    description: `Retrieves relevant content from the specified knowledge base based on the query criteria. `,
  })
  @ApiOkResponse({
    type: [DocumentDto],
  })
  @ApiDatasetIdParam()
  async similaritySearchVectorWithScore(
    @UUIDParam('dataset_id') datasetId: string,
    @Body() similaritySearchDto: SimilaritySearchDto,
  ): Promise<DocumentDto[] | [DocumentDto, number][]> {
    return this.retrievalService.similaritySearchVectorWithScore(datasetId, similaritySearchDto);
  }

  @Post(':dataset_id/rag')
  @Sse()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieval-Augmented Generation (RAG)',
    description: `
Performs Retrieval-Augmented Generation by retrieving content relevant to the query from the knowledge base 
and generating answers or summaries based on the retrieved results. `,
  })
  @ApiDatasetIdParam()
  @ApiOkResponse({
    description: 'Streams the generated response based on the retrieved content from the knowledge base.',
  })
  rag(
    @UUIDParam('dataset_id') datasetId: string,
    @Body() conversationDto: ConversationDto,
    @Body('fallbackMessage') fallbackMessage?: string,
  ): Promise<Observable<Record<string, string>>> {
    return this.retrievalService.RAG(datasetId, conversationDto, fallbackMessage);
  }
}
