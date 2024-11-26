import { Logger } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to log incoming HTTP requests.
 *
 * Logs the `User-Agent` header or a fallback to the request headers when `User-Agent` is unavailable.
 * This middleware is useful for debugging and monitoring incoming requests.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @param {Response} _res - The outgoing HTTP response object (not used here).
 * @param {NextFunction} next - The next middleware function in the chain.
 */
export function LoggerMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const userAgent = req.headers['user-agent'];
  const method = req.method;
  const url = req.url;

  // Construct the log message
  const logMessage = userAgent
    ? `💬  [${method}] ${url} - User-Agent: ${userAgent.split(') ')[0]}`
    : `💬  [${method}] ${url} - Headers: ${JSON.stringify(req.headers)}`;

  // Determine log level based on environment
  const logLevel = process.env.NODE_ENV === 'production' ? 'log' : 'debug';

  // Log the message with the appropriate level
  Logger[logLevel](logMessage, 'Bootstrap');

  next();
}
