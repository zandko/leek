import { Module } from '@nestjs/common';

import { PrismaModule } from '@leek/prisma';

import { FilesRepository } from './files.repository';
import { FilesRelationalRepository } from './repositories/files.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: FilesRepository,
      useClass: FilesRelationalRepository,
    },
  ],
  exports: [FilesRepository],
})
export class RelationaLeekFilesPersistenceModule {}
