import { Request, Response } from 'express';
import OrderedProduct from '../db/models/OrderedProduct';
import BaseController from './BaseController';

class OrderedProductController extends BaseController<OrderedProduct> {
  constructor() {
    super(OrderedProduct);
  }

  get(req: Request, res: Response) {
    this.execFindAndCountAll(req, res);
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

export default new OrderedProductController();
