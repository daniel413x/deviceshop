import { NextFunction, Request, Response } from 'express';
import {
  col,
  FindAndCountOptions,
  Op,
  Sequelize,
} from 'sequelize';
import Order from '../db/models/Order';
import OrderedProduct from '../db/models/OrderedProduct';
import Review from '../db/models/Review';
import ShopProduct from '../db/models/ShopProduct';
import User from '../db/models/User';
import ApiError from '../error/ApiError';
import { DELIVERED } from '../utils/consts';
import BaseController from './BaseController';

const includeAll = [
  {
    model: User,
    as: 'user',
  },
  {
    model: ShopProduct,
    as: 'shopproduct',
  },
  {
    model: OrderedProduct,
    as: 'orderedproduct',
    attributes: ['createdAt'],
  },
];

class ReviewController extends BaseController<Review> {
  constructor() {
    super(Review);
  }

  get(req: Request, res: Response) {
    const options: FindAndCountOptions<Review> = {
      include: includeAll,
    };
    if (req.query.order) {
      const order = JSON.parse(req.query.order as string);
      const byLowestRated = order.byLowestRated as string;
      const byHighestRated = order.byHighestRated as string;
      if (byLowestRated) {
        options.order = [[col('rating'), 'ASC']];
      }
      if (byHighestRated) {
        options.order = [[col('rating'), 'DESC']];
      }
    }
    this.execFindAndCountAll(req, res, options);
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
      include: includeAll,
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
