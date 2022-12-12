import { NextFunction, Request, Response } from 'express';
import Cart from '../db/models/Cart';
import { FindOptions } from '../types/types';
import { includeOrderedProducts } from '../utils/inclusions';
import BaseController from './BaseController';

class CartController extends BaseController<Cart> {
  constructor() {
    super(Cart);
  }

  getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.user;
    const options: FindOptions<Cart> = {
      where: {
        userId: id,
      },
      include: includeOrderedProducts,
    };
    this.execFindOne(req, res, next, options);
  }

  create(req: Request, res: Response) {
    this.execCreate(req, res);
  }

  edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new CartController();
