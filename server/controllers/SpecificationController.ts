import { Request, Response } from 'express';
import ShopProduct from '../db/models/ShopProduct';
// import ApiError from '../error/ApiError';
import BaseController from './BaseController';
import Brand from '../db/models/Brand';
import Type from '../db/models/Type';
import Specification from '../db/models/Specification';
import { FindAndCountOptions } from '../types/types';

class ShopProductController extends BaseController<ShopProduct> {
  constructor() {
    super(ShopProduct);
  }

  get(req: Request, res: Response) {
    const options: FindAndCountOptions<ShopProduct> = {};
    if (req.query.search) {
      options.include = [{
        model: Brand,
        as: 'brand',
      }, {
        model: Type,
        as: 'type',
      }, {
        model: Specification,
        as: 'specifications',
      }];
    }
    this.execFindAndCountAll(req, res, options);
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

export default new ShopProductController();
