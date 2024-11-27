import { Module } from '@nestjs/common';

import { ConfigureModule } from '@leek/configure';
import { PrismaModule } from '@leek/prisma';

import { DatasetProcessRuleRepository } from './dataset.process.rule.repository';
import { DatasetRepository } from './dataset.repository';
import { DocumentRepository } from './document.repository';
import { DocumentSegmentRepository } from './document.segment.repository';
import { EmbeddingRepository } from './embedding.repository';
import { DatasetProcessRuleRelationalRepository } from './repositories/dataset.process.rule.repository';
import { DatasetRelationalRepository } from './repositories/dataset.repository';
import { DocumentRelationalRepository } from './repositories/document.repository';
import { DocumentSegmentRelationalRepository } from './repositories/document.segment.repository';
import { EmbeddingRelationalRepository } from './repositories/embedding.repository';

@Module({
  imports: [PrismaModule, ConfigureModule],
  providers: [
    {
      provide: DatasetRepository,
      useClass: DatasetRelationalRepository,
    },
    {
      provide: DocumentRepository,
      useClass: DocumentRelationalRepository,
    },
    {
      provide: DocumentSegmentRepository,
      useClass: DocumentSegmentRelationalRepository,
    },
    {
      provide: DatasetProcessRuleRepository,
      useClass: DatasetProcessRuleRelationalRepository,
    },
    {
      provide: EmbeddingRepository,
      useClass: EmbeddingRelationalRepository,
    },
  ],
  exports: [
    DatasetRepository,
    DocumentRepository,
    DocumentSegmentRepository,
    DatasetProcessRuleRepository,
    EmbeddingRepository,
  ],
})
export class RelationalDatasetsPersistenceModule {}
