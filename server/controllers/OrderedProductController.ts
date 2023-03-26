import { Request, Response } from 'express';
import { FindAndCountOptions } from 'sequelize';
import { sequelize } from '../db';
import OrderedAddon from '../db/models/OrderedAddon';
import OrderedProduct from '../db/models/OrderedProduct';
import { inclusionsForOrderedProduct } from '../utils/inclusions';
import BaseController from './BaseController';

const options: FindAndCountOptions<OrderedProduct> = {};

class OrderedProductController extends BaseController<OrderedProduct> {
  constructor() {
    super(OrderedProduct);
  }

  get(req: Request, res: Response) { // only retrieved via cart
    this.execFindAndCountAll(req, res, options);
  }

  create(req: Request, res: Response) {
    options.include = inclusionsForOrderedProduct;
    this.execCreate(req, res, options);
  }

  edit(req: Request, res: Response) {
    this.execUpdate(req, res);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await sequelize.transaction(async (transaction) => {
      await OrderedAddon.destroy({
        where: {
          orderedProductId: id,
        },
        transaction,
      });
      await OrderedProduct.destroy({ where: { id }, transaction });
    });
    return res.status(204).end();
  }
}

export default new OrderedProductController();
