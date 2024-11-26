import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { isString, isObject } from 'lodash';

/**
 * Global exception filter to handle all uncaught exceptions.
 *
 * This filter catches and processes all exceptions thrown during the request lifecycle.
 * It logs the error details and returns a standardized error response to the client.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   * Catch and handle the exception.
   *
   * @param {unknown} exception - The exception that was thrown.
   * @param {ArgumentsHost} host - The arguments host containing execution context.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let httpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal Server Error';

    if (exception instanceof HttpException) {
      httpStatusCode = exception.getStatus();
      const httpExceptionResponse = exception.getResponse();

      if (isString(httpExceptionResponse)) {
        errorMessage = httpExceptionResponse;
      } else if (isObject(httpExceptionResponse) && httpExceptionResponse.hasOwnProperty('message')) {
        errorMessage = (httpExceptionResponse as HttpException).message;
      }
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
    }

    // Log the exception details
    this.logger.error({
      message: errorMessage,
      stackTrace: exception instanceof Error ? exception.stack : null,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });

    // Special handling for SSE (Server-Sent Events)
    if (request.headers.accept === 'text/event-stream') {
      this.logger.warn(`SSE request encountered an error: ${errorMessage}`);
      return;
    }

    // Construct error response payload
    const errorResponsePayload = {
      statusCode: httpStatusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: errorMessage,
    };

    // Send the response
    httpAdapter.reply(response, errorResponsePayload, httpStatusCode);
  }
}
