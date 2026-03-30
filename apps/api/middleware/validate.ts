import type { Request, Response, NextFunction } from 'express';
import { validationResult, body as expressBody, param as expressParam, query as expressQuery } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export const validate = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join(', ');
    throw new ApiError(400, message);
  }
  next();
};

export const body = expressBody;
export const param = expressParam;
export const query = expressQuery;

export const uuidParam = (name: string = 'id') =>
  expressParam(name).isUUID(4).withMessage(`${name} must be a valid UUID`);

export const slugParam = () =>
  expressParam('slug').isSlug().withMessage('Invalid slug format');
