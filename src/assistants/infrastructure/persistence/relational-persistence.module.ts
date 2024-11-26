import { Module } from '@nestjs/common';

import { ConfigureModule } from '@leek/configure';
import { PrismaModule } from '@leek/prisma';

import { AssistantRepository } from './assistants.repository';
import { AssistantRelationalRepository } from './repositories/assistants.repository';

@Module({
  imports: [PrismaModule, ConfigureModule],
  providers: [
    {
      provide: AssistantRepository,
      useClass: AssistantRelationalRepository,
    },
  ],
  exports: [AssistantRepository],
})
export class RelationalAssistantPersistenceModule {}
