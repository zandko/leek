import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationQuery = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { currentPage = 1, pageSize = 10, q } = request.query;

  return {
    page: Math.max(Number(currentPage), 1),
    size: Math.max(Number(pageSize), 1),
    q,
  };
});
