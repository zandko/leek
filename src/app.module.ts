import path from 'path';

import { Module } from '@nestjs/common';

import { ClsModule } from 'nestjs-cls';
import { AcceptLanguageResolver, HeaderResolver, QueryResolver } from 'nestjs-i18n';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';

import { AssistantsModule } from '@leek/assistants/assistants.module';
import { ConfigureModule, ConfigureAdapter } from '@leek/configure';
import { DatasetsModule } from '@leek/datasets/datasets.module';
import { FilesModule } from '@leek/files/files.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigureModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    I18nModule.forRootAsync({
      useFactory: ({ FALLBACK_LANGUAGE }: ConfigureAdapter) => ({
        fallbackLanguage: FALLBACK_LANGUAGE,
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        new QueryResolver(['lang', 'locale', 'language']),
        new HeaderResolver(['x-lang', 'x-locale', 'x-language']),
        AcceptLanguageResolver,
      ],
      inject: [ConfigureAdapter],
    }),
    DatasetsModule,
    FilesModule,
    AssistantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
