import { Request, Response } from 'express';
import ShippingMethod from '../db/models/ShippingMethod';
import BaseController from './BaseController';

class ShippingMethodController extends BaseController<ShippingMethod> {
  constructor() {
    super(ShippingMethod);
  }

  get(req: Request, res: Response) {
    this.execFindAndCountAll(req, res);
  }

  create(req: Request, res: Response) {
    this.execCreate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new ShippingMethodController();
