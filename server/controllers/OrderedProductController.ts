import { Request, Response } from 'express';
import { FindAndCountOptions } from 'sequelize';
import OrderedProduct from '../db/models/OrderedProduct';
import ShopProduct from '../db/models/ShopProduct';
import BaseController from './BaseController';

const include = [{
  model: ShopProduct,
  as: 'shopproduct',
}];

const options: FindAndCountOptions<OrderedProduct> = {};

class OrderedProductController extends BaseController<OrderedProduct> {
  constructor() {
    super(OrderedProduct);
  }

  get(req: Request, res: Response) {
    this.execFindAndCountAll(req, res, options);
  }

  create(req: Request, res: Response) {
    options.include = include;
    this.execCreate(req, res, options);
  }

  edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderedProductController();
