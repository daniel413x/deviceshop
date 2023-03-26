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
import { sequelize } from '../db';

class OrderController extends BaseController<Order> {
  constructor() {
    super(Order);
  }

  async get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const options: FindAndCountOptions<Order> = {
      order: [
        [col('createdAt'), 'DESC'],
      ],
      where: {
        userId: id,
      },
      include: inclusionsForOrder,
      distinct: true,
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
      distinct: true,
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
        rows: filteredOrders,
        count: filteredOrders.length,
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
    await sequelize.transaction(async (transaction) => {
      const order = await Order.create({
        userId,
        status: [PROCESSING],
        total,
      }, { transaction });
      await Promise.all(orderedProducts.rows.map(async (item) => {
        await item.update({
          orderId: order.id,
          cartId: null,
        }, { transaction });
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
      }, { transaction });
      await OrderedShippingMethod.create({
        ...JSON.parse(shippingMethod),
        orderId: order.id,
      }, { transaction });
      const returnedOrder = await Order.findByPk(order.id, {
        include: inclusionsForOrder,
        transaction,
      });
      return res.json(returnedOrder);
    });
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    return this.execValidateUserAndUpdate(req, res, next);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderController();
