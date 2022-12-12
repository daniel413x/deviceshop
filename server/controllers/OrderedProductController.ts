import { Request, Response } from 'express';
import { FindAndCountOptions } from 'sequelize';
import OrderedAddon from '../db/models/OrderedAddon';
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

  async delete(req: Request, res: Response) {
    await OrderedAddon.destroy({ where: { orderedProductId: req.params.id } });
    this.execDestroy(req, res);
  }
}

export default new OrderedProductController();
