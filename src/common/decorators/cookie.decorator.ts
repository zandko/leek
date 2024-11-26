import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { Request } from 'express';

/**
 * Custom parameter decorator to extract cookies from the request.
 *
 * This decorator allows retrieving all cookies or a specific cookie by its key
 * from the incoming HTTP request.
 *
 * @param {string} [data] - The key of the cookie to retrieve. If not provided, all cookies will be returned.
 * @param {ExecutionContext} ctx - The execution context, which provides access to the request object.
 * @returns {any} - The value of the specified cookie or all cookies if no key is provided.
 */
export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return data ? request.cookies?.[data] : request.cookies;
});
