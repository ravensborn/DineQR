import type { Request } from 'express';
import { PAGINATION_DEFAULTS } from '@dineqr/shared';

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function getPagination(req: Request): PaginationParams {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(
    PAGINATION_DEFAULTS.MAX_LIMIT,
    Math.max(1, parseInt(req.query.limit as string) || PAGINATION_DEFAULTS.LIMIT),
  );
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export function getPaginatedResponse<T>(records: T[], total: number, params: PaginationParams) {
  return {
    records,
    meta: {
      total,
      page: params.page,
      limit: params.limit,
      total_pages: Math.ceil(total / params.limit),
    },
  };
}
