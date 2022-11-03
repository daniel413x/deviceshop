import { NextFunction, Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';
import Order from '../db/models/Order';
import Review from '../db/models/Review';
import ShopProduct from '../db/models/ShopProduct';
import User from '../db/models/User';
import ApiError from '../error/ApiError';
import { DELIVERED } from '../utils/consts';
import BaseController from './BaseController';

class ReviewController extends BaseController<Review> {
  constructor() {
    super(Review);
  }

  get(req: Request, res: Response) {
    this.execFindAndCountAll(req, res);
  }

  recentReviews(req: Request, res: Response) {
    const options = {
      where: {
        rating: {
          [Op.gte]: 4,
        },
        body: {
          [Op.not]: null,
        },
      },
      limit: 3,
      order: Sequelize.literal('random()'),
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: ShopProduct,
          as: 'product',
        },
      ],
    };
    this.execFindAndCountAll(req, res, options);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = res.locals.user;
    const { id: orderId } = req.params;
    const order = await Order.findByPk(orderId);
    const notEligible = order.status.indexOf(DELIVERED) === -1;
    const notUser = order.userId !== userId;
    if (notEligible || notUser) {
      return next(ApiError.unauthorized('Unauthorized request'));
    }
    return this.execCreate(req, res);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new ReviewController();
