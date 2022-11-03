import { Request, Response } from 'express';
import Type from '../db/models/Type';
import BaseController from './BaseController';

class TypeController extends BaseController<Type> {
  constructor() {
    super(Type);
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

export default new TypeController();
