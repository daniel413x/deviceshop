import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import ApiError from '../error/ApiError';
import {
  ICart,
  IGuestAddedAddon,
  IGuestAddedProduct,
  IUser,
} from '../types/types';
import { USER } from '../utils/consts';
import User from '../db/models/User';
import BaseController from './BaseController';
import { assignBodyAndHandleStringImageAttribute } from '../utils/functions';
import Cart from '../db/models/Cart';
import OrderedProduct from '../db/models/OrderedProduct';
import { inclusionsForCart } from '../utils/inclusions';
import OrderedAddon from '../db/models/OrderedAddon';

const generateJwt = ({
  id,
  email,
  roles,
  username,
  firstName,
  lastName,
  avatar,
  name,
  phoneNumber,
}: any, expiresIn?: string) => jwt.sign(
  {
    id,
    email,
    username,
    firstName,
    lastName,
    roles,
    avatar,
    name,
    phoneNumber,
  },
  process.env.S_KEY!,
  {
    expiresIn,
  },
);

class UserController extends BaseController<User> {
  constructor() {
    super(User);
  }

  async convertGuestAddedItems(items: IGuestAddedProduct[], cart: ICart): Promise<void> {
    await Promise.all(items.map(async (item) => {
      const {
        shopproduct: {
          id: shopProductId,
          discountedPrice,
          brandId,
          typeId,
        },
        addons,
      } = item;
      const {
        id: orderedProductId,
      } = await OrderedProduct.create({
        shopProductId,
        price: discountedPrice,
        id: uuidv4(),
        cartId: cart.id,
        userId: cart.userId,
        brandId,
        typeId,
      });
      if (item.addons) {
        await Promise.all(addons.map(async (addon) => {
          const {
            category,
            price,
            addon: {
              id: addonId,
            },
          } = addon as IGuestAddedAddon;
          await OrderedAddon.create({
            orderedProductId,
            category,
            price,
            addonId,
          });
        }));
      }
    }));
  }

  async getCart(userId: string): Promise<ICart> {
    const cart = await Cart.findOne({
      where: {
        userId,
      },
      include: inclusionsForCart,
    });
    return cart;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    let userForm;
    if (req.files) {
      userForm = assignBodyAndHandleStringImageAttribute(req, 'avatar');
    } else {
      userForm = req.body;
    }
    const {
      email,
      password,
      username,
    } = userForm;
    const incompleteForm = !email || !password;
    if (incompleteForm) {
      return next(ApiError.badRequest('Incomplete form'));
    }
    const formattedEmail = ['', ''];
    email.split('@').forEach((p: string, i: number) => {
      formattedEmail[i] = p;
    });
    const [local, domain] = formattedEmail;
    const expectedLength = formattedEmail.length === 2;
    const validEmail = expectedLength && local && domain;
    if (!validEmail) {
      return next(ApiError.badRequest('Invalid email format'));
    }
    const validPassword = /(?=^\S{6,256}$)^.+$/i.test(password);
    if (!validPassword) {
      return next(ApiError.badRequest('Invalid password'));
    }
    const emailTaken = await User.findOne({ where: { email } });
    if (emailTaken) {
      return next(ApiError.conflict('Account with that email already exists'));
    }
    const usernameTaken = await User.findOne({ where: { username } });
    if (usernameTaken) {
      return next(ApiError.conflict('Account with that username already exists'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      ...userForm,
      id: uuidv4(),
      password: hashPassword,
      roles: [USER],
    });
    const token = generateJwt(user, '24h');
    let cart = await Cart.create({
      userId: user.id,
    }) as ICart;
    if (req.body.guestAddedItems) {
      await this.convertGuestAddedItems(req.body.guestAddedItems, cart);
      cart = await this.getCart(user.id);
    }
    return res.json({ token, cart });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const {
      emailOrUsername,
      password: reqPassword,
    } = req.body;
    const user: IUser | null = await User.findOne({
      where: {
        [Op.or]: [{
          username: emailOrUsername,
        },
        {
          email: emailOrUsername,
        }],
      },
    });
    if (!user) {
      return next(ApiError.internal('Invalid credentials'));
    }
    const UserPassword = user.password;
    const comparePassword = bcrypt.compareSync(
      reqPassword,
      UserPassword,
    );
    if (!comparePassword) {
      return next(ApiError.internal('Incorrect password'));
    }
    const token = generateJwt(user, '24h');
    let cart = await this.getCart(user.id);
    if (req.body.guestAddedItems) {
      await this.convertGuestAddedItems(req.body.guestAddedItems, cart);
      cart = await this.getCart(user.id);
    }
    return res.json({ token, cart });
  }

  async auth(req: Request, res: Response) {
    const { user } = res.locals;
    const token = generateJwt(user, '24h');
    const cart = await this.getCart(user.id);
    return res.json({ token, cart });
  }

  async edit(req: Request, res: Response) {
    let updatedVals;
    const { id } = res.locals.user;
    const user = await User.findByPk(id);
    if (req.files) {
      updatedVals = assignBodyAndHandleStringImageAttribute(req, 'avatar', user);
    } else {
      updatedVals = req.body;
    }
    if ('password' in updatedVals) {
      const hashPassword = await bcrypt.hash(updatedVals.password, 5);
      updatedVals.password = hashPassword;
    }
    const updatedUser = await User.update(updatedVals, { where: { id }, returning: true });
    const token = generateJwt(updatedUser[1][0], '24h');
    return res.json({ token });
  }

  async delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new UserController();
