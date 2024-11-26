import { Module } from '@nestjs/common';

import { ConfigureModule } from '@leek/configure';
import { FilesService } from '@leek/files/files.service';
import { RelationaLeekFilesPersistenceModule } from '@leek/files/infrastructure/persistence/relational-persistence.module';
import { PrismaModule, TransactionManager } from '@leek/prisma';

import { DatasetController } from './controllers/dataset.controller';
import { DocumentSegmentController } from './controllers/document-segment.controller';
import { DocumentController } from './controllers/document.controller';
import { ExampleController } from './controllers/example.controller';
import { IndexingController } from './controllers/indexing.controller';
import { RetrievalController } from './controllers/retrieval.controller';
import { RelationalDatasetsPersistenceModule } from './infrastructure/persistence/relational-persistence.module';
import { DatasetService } from './services/dataset.service';
import { DocumentSegmentService } from './services/document-segment.service';
import { DocumentService } from './services/document.service';
import { IndexingService } from './services/indexing.service';
import { JiebaKeywordService } from './services/jieba-keyword.service';
import { LLMGeneratorService } from './services/llm-generator.service';
import { ProcessDocumentService } from './services/process-document.service';
import { RetrievalService } from './services/retrieval.service';

@Module({
  imports: [ConfigureModule, PrismaModule, RelationalDatasetsPersistenceModule, RelationaLeekFilesPersistenceModule],
  controllers: [
    DatasetController,
    DocumentController,
    DocumentSegmentController,
    IndexingController,
    RetrievalController,
    ExampleController,
  ],
  providers: [
    DatasetService,
    DocumentService,
    DocumentSegmentService,
    FilesService,
    IndexingService,
    ProcessDocumentService,
    JiebaKeywordService,
    LLMGeneratorService,
    RetrievalService,
    TransactionManager,
  ],
})
export class DatasetsModule {}
