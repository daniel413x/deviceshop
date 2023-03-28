import { Request, Response } from 'express';
import SpecificationCategory from '../db/models/SpecificationCategory';
import { inclusionsForSpecificationCategory } from '../utils/inclusions';
import BaseController from './BaseController';

class SpecificationCategoryController extends BaseController<SpecificationCategory> {
  constructor() {
    super(SpecificationCategory);
  }

  get(req: Request, res: Response) {
    const options = {
      include: inclusionsForSpecificationCategory,
    };
    this.execFindAndCountAll(req, res, options);
  }
}

export default new SpecificationCategoryController();
