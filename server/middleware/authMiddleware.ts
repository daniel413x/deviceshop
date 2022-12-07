import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';

const jwt = require('jsonwebtoken');

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return ApiError.unauthorized('Unauthorized request');
    }
    const decoded = jwt.verify(token, process.env.S_KEY);
    res.locals.user = decoded;
    return next();
  } catch (e) {
    return ApiError.unauthorized('Auth token expired. Please re-log in.');
  }
};
