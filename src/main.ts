import {
  Logger,
  ValidationPipe,
  UnprocessableEntityException,
  HttpStatus,
  VersioningType,
  VERSION_NEUTRAL,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { NestFactory, Reflector, HttpAdapterHost } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import { urlencoded, json } from 'express';
import helmet from 'helmet';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

import { GlobalExceptionFilter, LoggerMiddleware } from '@leek/common';
import { ConfigureAdapter } from '@leek/configure';

import { AppModule } from './app.module';
import { setupSwagger } from './setup.swagger';

const logger = new Logger('bootstrap');

async function bootstrap() {
  // Initialize the NestJS application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Retrieve required services and configuration
  const httpAdapterHost = app.get(HttpAdapterHost);
  const configure = app.get(ConfigureAdapter);
  const { PORT } = configure;

  // Enable Cross-Origin Resource Sharing (CORS) with universal access
  app.enableCors({ origin: '*', credentials: true });

  // Set a global prefix for all routes except the root
  app.setGlobalPrefix('api', { exclude: ['/'] });

  // Enable versioning for APIs
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  // Middleware to enhance security by setting HTTP headers
  app.use(helmet());

  // Enable response compression
  app.use(compression());

  // Parse cookies from incoming requests
  app.use(cookieParser());

  // Configure body parser with size limits for JSON and URL-encoded data
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));

  // Log incoming requests using a custom logger middleware
  app.use(LoggerMiddleware);

  // Apply global pipes for request validation and transformation
  app.useGlobalPipes(
    // NestJS validation pipe with custom settings
    new ValidationPipe({
      whitelist: true, // Strip unallowed properties
      transform: true, // Automatically transform payloads to DTO classes
      dismissDefaultMessages: true, // Suppress default error messages
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Use 422 for validation errors
      exceptionFactory: (errors) => new UnprocessableEntityException(errors), // Customize exception response
    }),
    // I18n validation pipe for multilingual error messages
    new I18nValidationPipe(),
  );

  // Use global interceptors to handle serialization logic
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Apply global exception filters
  app.useGlobalFilters(
    new GlobalExceptionFilter(httpAdapterHost),
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  // Enable Swagger API documentation in development and test environments
  if (Object.is(process.env.NODE_ENV, 'development') || Object.is(process.env.NODE_ENV, 'test')) {
    setupSwagger(app, configure);
  }

  // Start the application and listen on the configured port

  await app.listen(PORT);

  // Log the application startup message
  Logger.log(`🚀 Application is running on: http://localhost:${PORT}`);
}

// Handle bootstrap errors and log them
bootstrap().catch((e) => {
  logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
