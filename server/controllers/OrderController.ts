import { NextFunction, Request, Response } from 'express';
import Order from '../db/models/Order';
import BaseController from './BaseController';
import OrderedProduct from '../db/models/OrderedProduct';
import ShopProduct from '../db/models/ShopProduct';
import AddressForOrder from '../db/models/AddressForOrder';
import { PROCESSING } from '../utils/consts';
import OrderedShippingMethod from '../db/models/OrderedShippingMethod';
import { inclusionsForOrder } from '../utils/inclusions';

class OrderController extends BaseController<Order> {
  constructor() {
    super(Order);
  }

  async get(req: Request, res: Response) {
    const { id } = res.locals.user;
    const options = {
      where: {
        id,
      },
      include: [
        {
          model: OrderedProduct,
          as: 'products',
          include: [{ model: ShopProduct, as: 'shopproduct' }],
        },
        {
          model: AddressForOrder,
          as: 'orderAddress',
        },
      ],
    };
    this.execFindAndCountAll(req, res, options);
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

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    return this.execValidateUserAndUpdate(req, res, next);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderController();
