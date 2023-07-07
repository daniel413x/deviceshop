import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../error/ApiError';
import { Roles } from '../types/types';

interface CheckRoleMiddlewareProps {
  accessRoles: Roles[];
  requireAll?: boolean;
}

export default function ({
  accessRoles,
  requireAll,
}: CheckRoleMiddlewareProps) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return next();
    }
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return next(ApiError.badRequest('Unauthorized'));
      }
      const decoded = jwt.verify(token, process.env.S_KEY!) as JwtPayload;
      const userRoles = decoded.roles!;
      if (requireAll) {
        for (let i = 0; i < userRoles.length; i += 1) {
          if (accessRoles.indexOf(userRoles.length[i]) === -1) {
            return next(ApiError.badRequest('Forbidden'));
          }
        }
        res.locals.user = decoded;
        return next();
      }
      for (let i = 0; i < userRoles.length; i += 1) {
        if (accessRoles.indexOf(userRoles[i]) >= 0) {
          res.locals.user = decoded;
          return next();
        }
      }

      return next(ApiError.badRequest('Forbidden'));
    } catch (e) {
      return next(ApiError.badRequest('Unauthorized'));
    }
  };
}
