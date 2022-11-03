import { NextFunction, Request, Response } from 'express';
import Order from '../db/models/Order';
import BaseController from './BaseController';
import OrderedProduct from '../db/models/OrderedProduct';
import ShopProduct from '../db/models/ShopProduct';
import AddressForOrder from '../db/models/AddressForOrder';
import { PROCESSING } from '../utils/consts';

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
          include: [{ model: ShopProduct, as: 'shopproduct' }],
          as: 'products',
        },
        {
          model: AddressForOrder,
          as: 'orderAddress',
        },
      ],
    };
    this.execFindAndCountAll(req, res, options);
  }

  async create(req: Request, res: Response) {
    const { id: userId } = res.locals.user;
    const orderedProducts = await OrderedProduct.findAndCountAll({
      where: {
        userId,
        orderId: null,
      },
    });
    const order = await Order.create({
      userId,
      status: [PROCESSING],
    });
    await Promise.all(orderedProducts.rows.map(async (item) => {
      await OrderedProduct.update({ orderId: order.id }, { where: { id: item.id } });
    }));
    await AddressForOrder.create({
      ...req.body.address,
      orderId: order.id,
    });
    return res.json(order);
  }

  async changeStatus(req: Request, res: Response, next: NextFunction) {
    return this.execValidateUserAndUpdate(req, res, next);
  }

  delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new OrderController();
