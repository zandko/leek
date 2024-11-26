declare global {
  declare namespace LEEK {
    declare type Nullable<T> = T | null;
    declare type NonNullable<T> = T extends null | undefined ? never : T;
    declare type Recordable<T = any> = Record<string, T>;
    declare interface ReadonlyRecordable<T = any> {
      readonly [key: string]: T;
    }
    declare type DeepPartial<T> = {
      [P in keyof T]?: DeepPartial<T[P]>;
    };

    declare type JsonObject = {
      [Key in string]?: JsonValue;
    };

    declare type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

    declare type JsonArray = Array<JsonValue>;

    declare type BaiduQianfanChatInput = {
      /**
       * Model name to use. Available options are: ERNIE-Bot, ERNIE-Lite-8K, ERNIE-Bot-4
       * Alias for `model`
       * @default "ERNIE-Bot-turbo"
       */
      modelName: string;
      /** Model name to use. Available options are: ERNIE-Bot, ERNIE-Lite-8K, ERNIE-Bot-4
       * @default "ERNIE-Bot-turbo"
       */
      model: string;
      /** Whether to stream the results or not. Defaults to false. */
      streaming?: boolean;
      /** Messages to pass as a prefix to the prompt */
      prefixMessages?: {
        role: 'assistant' | 'user';
        content: string;
      }[];
      /**
       * ID of the end-user who made requests.
       */
      userId?: string;
      /**
       * Access key to use when making requests by Qianfan SDK. Defaults to the value of
       * `QIANFAN_KEY` environment variable.
       */
      qianfanAK?: string;
      /**
       * Secret key to use when making requests by Qianfan SDK. Defaults to the value of
       * `QIANFAN_KEY` environment variable.
       */
      qianfanSK?: string;
      /**
       * Access key to use when making requests by Qianfan SDK with auth. Defaults to the value of
       * `QIANFAN_ACCESS_KEY` environment variable.
       */
      qianfanAccessKey?: string;
      /**
       * Secret key to use when making requests by Qianfan SDK with auth. Defaults to the value of
       * `QIANFAN_SECRET_KEY` environment variable.
       */
      qianfanSecretKey?: string;
      /** Amount of randomness injected into the response. Ranges
       * from 0 to 1 (0 is not included). Use temp closer to 0 for analytical /
       * multiple choice, and temp closer to 1 for creative
       * and generative tasks. Defaults to 0.95.
       */
      temperature?: number;
      /** Total probability mass of tokens to consider at each step. Range
       * from 0 to 1.0. Defaults to 0.8.
       */
      topP?: number;
      /** Penalizes repeated tokens according to frequency. Range
       * from 1.0 to 2.0. Defaults to 1.0.
       */
      penaltyScore?: number;
    };
  }
}

export {};
