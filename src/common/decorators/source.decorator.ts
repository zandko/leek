import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CreationType } from '@leek/constants';

/**
 * Custom parameter decorator to determine the request source.
 *
 * This decorator extracts the source of the request (`web` or `api`) based on the `x-requested-by` header.
 * If the header is absent or invalid, it falls back to inspecting the `User-Agent` header or using the provided default.
 *
 * @param {CreationType} defaultSource - The default source to return if no valid source is detected. Defaults to `'api'`.
 * @param {ExecutionContext} ctx - The execution context, which provides access to the request object.
 * @returns {CreationType} - The determined source of the request.
 */
export const Source = createParamDecorator(
  (defaultSource: CreationType = CreationType.API, ctx: ExecutionContext): CreationType => {
    const request = ctx.switchToHttp().getRequest();

    // Check the 'x-requested-by' header for explicit source
    const requestedBy = request.headers['x-requested-by'];
    if (requestedBy === CreationType.Web || requestedBy === CreationType.API) {
      return requestedBy as CreationType;
    }

    // Fallback to inspecting the 'User-Agent' header
    const userAgent = request.headers['user-agent'] || '';
    if (/mozilla/i.test(userAgent)) {
      return CreationType.Web;
    }

    // Default to the provided source
    return defaultSource;
  },
);
