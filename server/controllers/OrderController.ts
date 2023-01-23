import {
  col,
  fn,
  Op,
} from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import Order from '../db/models/Order';
import BaseController from './BaseController';
import OrderedProduct from '../db/models/OrderedProduct';
import AddressForOrder from '../db/models/AddressForOrder';
import {
  CANCELED,
  DELIVERED,
  PROCESSING,
  SHIPPED,
} from '../utils/consts';
import OrderedShippingMethod from '../db/models/OrderedShippingMethod';
import { inclusionsForOrder } from '../utils/inclusions';
import { FindAndCountOptions } from '../types/types';
import ShopProduct from '../db/models/ShopProduct';

class OrderController extends BaseController<Order> {
  constructor() {
    super(Order);
  }

  async get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const options: any = {
      order: [
        [col('createdAt'), 'DESC'],
      ],
      where: {
        userId: id,
      },
      include: inclusionsForOrder,
    };
    this.execFindAndCountAll(req, res, options);
  }

  async admin(req: Request, res: Response) {
    const options: FindAndCountOptions<Order> = {
      include: inclusionsForOrder,
      order: [
        fn('array_positions', col('status'), CANCELED),
        fn('array_positions', col('status'), DELIVERED),
        fn('array_positions', col('status'), SHIPPED),
        fn('array_positions', col('status'), PROCESSING),
      ],
    };
    if (req.query.unshipped) {
      options.where = {
        ...options.where,
        [Op.and]: [
          {
            [Op.not]: {
              status: {
                [Op.contains]: [CANCELED],
              },
            },
          },
          {
            [Op.not]: {
              status: {
                [Op.contains]: [SHIPPED],
              },
            },
          },
        ],
      };
    }
    if (req.query.search) {
      const {
        search,
      } = req.query;
      const orders = await Order.findAndCountAll(options);
      const filteredOrders = orders.rows.filter((order) => {
        if (order.id.includes(search as string)) {
          return true;
        }
        return false;
      });
      return res.json({
        ...orders,
        rows: filteredOrders,
      });
    }
    return this.execFindAndCountAll(req, res, options);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = res.locals.user;
    const options = {
      where: {
        userId: id,
      },
      include: inclusionsForOrder,
    };
    this.execFindOneByParams(req, res, next, options);
  }

  async create(req: Request, res: Response) {
    const { id: userId } = res.locals.user;
    const { total, shippingMethod, address } = req.body;
    const orderedProducts = await OrderedProduct.findAndCountAll({
      where: {
        userId,
        orderId: null, // cart item = no order id yet
      },
    });
    const order = await Order.create({
      userId,
      status: [PROCESSING],
      total,
    });
    await Promise.all(orderedProducts.rows.map(async (item) => {
      await item.update({
        orderId: order.id,
        cartId: null,
      });
    }));
    const shopProducts = await ShopProduct.findAll({
      where: {
        id: orderedProducts.rows.map((orderedProduct) => orderedProduct.shopProductId),
      },
    });
    shopProducts.forEach((shopProduct) => {
      shopProduct.update({
        stock: shopProduct.stock - 1,
      });
    });
    await AddressForOrder.create({
      ...address,
      orderId: order.id,
    });
    await OrderedShippingMethod.create({
      ...JSON.parse(shippingMethod),
      orderId: order.id,
    });
    const returnedOrder = await Order.findByPk(order.id, {
      include: inclusionsForOrder,
    });
    return res.json(returnedOrder);
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    return this.execValidateUserAndUpdate(req, res, next);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderController();
