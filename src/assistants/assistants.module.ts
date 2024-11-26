import { Module } from '@nestjs/common';

import { ConfigureModule } from '@leek/configure';
import { RelationalDatasetsPersistenceModule } from '@leek/datasets/infrastructure/persistence/relational-persistence.module';
import { RetrievalService } from '@leek/datasets/services/retrieval.service';

import { AssistantController } from './assistants.controller';
import { AssistantService } from './assistants.service';
import { RelationalAssistantPersistenceModule } from './infrastructure/persistence/relational-persistence.module';

@Module({
  imports: [ConfigureModule, RelationalAssistantPersistenceModule, RelationalDatasetsPersistenceModule],
  controllers: [AssistantController],
  providers: [AssistantService, RetrievalService],
})
export class AssistantsModule {}
