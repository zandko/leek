import { Module } from '@nestjs/common';

import { ConfigureModule } from '@leek/configure';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { RelationaLeekFilesPersistenceModule } from './infrastructure/persistence/relational-persistence.module';

@Module({
  imports: [ConfigureModule, RelationaLeekFilesPersistenceModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
