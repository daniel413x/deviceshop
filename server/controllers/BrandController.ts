import { Request, Response } from 'express';
import Brand from '../db/models/Brand';
import BaseController from './BaseController';

class BrandController extends BaseController<Brand> {
  constructor() {
    super(Brand);
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

export default new BrandController();
