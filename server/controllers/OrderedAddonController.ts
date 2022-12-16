import { Request, Response } from 'express';
import OrderedAddon from '../db/models/OrderedAddon';
import { inclusionsForOrderedAddon } from '../utils/inclusions';
import BaseController from './BaseController';

class OrderedAddonController extends BaseController<OrderedAddon> {
  constructor() {
    super(OrderedAddon);
  }

  async create(req: Request, res: Response) {
    const {
      category,
      orderedProductId,
    } = req.body;
    const removePreviousAddon = await OrderedAddon.findOne({
      where: {
        category,
        orderedProductId,
      },
    });
    if (removePreviousAddon) {
      await removePreviousAddon.destroy();
    }
    const options = {
      include: inclusionsForOrderedAddon,
    };
    this.execCreate(req, res, options);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderedAddonController();
