import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import logger from '../utils/logger.js';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
  }

  logger.error('Unhandled error:', err);

  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : (err.message || String(err)),
    data: null,
  });
};
