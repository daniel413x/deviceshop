import { Request, Response } from 'express';
import Addon from '../db/models/Addon';
import BaseController from './BaseController';

class AddonController extends BaseController<Addon> {
  constructor() {
    super(Addon);
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

export default new AddonController();
