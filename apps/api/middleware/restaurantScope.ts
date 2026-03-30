import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export const restrictToOwnRestaurant = (req: Request, _res: Response, next: NextFunction) => {
  if (req.user?.role === 'restaurant_admin') {
    if (!req.user.restaurant_id) {
      throw new ApiError(403, 'No restaurant assigned to this account');
    }
    // Inject restaurant_id for create/update
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      req.body.restaurant_id = req.user.restaurant_id;
    }
    // Inject into query for list operations
    if (!req.query.restaurant_id) {
      req.query.restaurant_id = req.user.restaurant_id;
    }
  }
  next();
};
