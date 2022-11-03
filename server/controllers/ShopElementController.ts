import { Request, Response } from 'express';
import ShopElement from '../db/models/ShopElement';
import BaseController from './BaseController';

class ShopElementController extends BaseController<ShopElement> {
  constructor() {
    super(ShopElement);
  }

  get(req: Request, res: Response) {
    this.execFindAndCountAll(req, res);
  }

  getByReference(req: Request, res: Response) {
    this.execFindOneByParams(req, res);
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

export default new ShopElementController();
