import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigureAdapter } from './adapter';

/**
 * Service to manage application configuration.
 *
 * This service implements `ConfigureAdapter` and provides access to
 * environment-specific configuration values, with fallbacks for defaults.
 */
@Injectable()
export class ConfigureService implements ConfigureAdapter {
  constructor(private readonly config: ConfigService) {}

  PORT = parseInt(this.config.get<string>('PORT') ?? '3000', 10);
  HOST = this.config.get<string>('HOST') ?? 'localhost';
  TZ = this.config.get<string>('TZ') ?? 'UTC';
  FALLBACK_LANGUAGE = this.config.get<string>('FALLBACK_LANGUAGE') ?? 'en-US';

  OPENAI = {
    API_KEY: this.config.get<string>('OPENAI_API_KEY'),
    BASE_URL: this.config.get<string>('OPENAI_API_HOST'),
  };
  TENCENT = {
    SECRET_ID: this.config.get<string>('TENCENT_CLOUND_SECRET_ID'),
    SECRET_KEY: this.config.get<string>('TENCENT_CLOUND_SECRET_KEY'),
    COS_BUCKET: this.config.get<string>('TENCENT_CLOUND_COS_BUCKET'),
    COS_REGION: this.config.get<string>('TENCENT_CLOUND_COS_REGION') ?? 'ap-shanghai',
  };
}
