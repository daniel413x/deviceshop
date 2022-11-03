import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';

export default (req: Request, res: Response, next: NextFunction) => {
  next(ApiError.notFound('Resource not found (404)'));
};
