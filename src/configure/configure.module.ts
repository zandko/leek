import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ConfigureAdapter } from './adapter';
import { ConfigureService } from './configure.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.local'],
    }),
  ],
  providers: [
    {
      provide: ConfigureAdapter,
      useFactory: (config: ConfigService) => {
        return new ConfigureService(config);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ConfigureAdapter],
})
export class ConfigureModule {}
