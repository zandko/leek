/**
 * Abstract configuration adapter interface.
 *
 * This interface defines the structure for application configuration, including server settings,
 * timezone, language preferences, and third-party service credentials.
 */
export abstract class ConfigureAdapter {
  /**
   * The port number on which the application server listens.
   */
  PORT: number;

  /**
   * The hostname or IP address of the application server.
   */
  HOST: string;

  /**
   * The timezone used by the application (e.g., "UTC", "Asia/Shanghai").
   */
  TZ: string;

  /**
   * The fallback language code for the application (e.g., "en", "zh").
   */
  FALLBACK_LANGUAGE: string;

  /**
   * Configuration for OpenAI services.
   */
  OPENAI: {
    /**
     * The API key for authenticating requests to OpenAI services.
     */
    API_KEY: string;

    /**
     * The base URL for OpenAI API requests (e.g., "https://api.openai.com").
     */
    BASE_URL: string;
  };

  /**
   * Configuration for Tencent Cloud services.
   */
  TENCENT: {
    /**
     * The secret ID for authenticating requests to Tencent Cloud services.
     */
    SECRET_ID: string;

    /**
     * The secret key for authenticating requests to Tencent Cloud services.
     */
    SECRET_KEY: string;

    /**
     * The name of the COS (Cloud Object Storage) bucket used in Tencent Cloud.
     */
    COS_BUCKET: string;

    /**
     * The region code for the COS bucket (e.g., "ap-shanghai").
     */
    COS_REGION: string;
  };
}
