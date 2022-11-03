import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../error/ApiError';

export default function (role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return next(ApiError.badRequest('Unauthorized'));
      }
      const decoded = jwt.verify(token, process.env.S_KEY!) as JwtPayload;
      if (decoded.roles!.indexOf(role) === -1) {
        return next(ApiError.badRequest('Forbidden'));
      }
      res.locals.user = decoded;
      return next();
    } catch (e) {
      return next(ApiError.badRequest('Unauthorized'));
    }
  };
}
