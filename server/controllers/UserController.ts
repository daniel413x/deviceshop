import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op, Transaction } from 'sequelize';
import ApiError from '../error/ApiError';
import {
  ICart,
  IGuestAddedAddon,
  IGuestAddedProduct,
  IUser,
} from '../types/types';
import { GUEST, USER } from '../utils/consts';
import User from '../db/models/User';
import BaseController from './BaseController';
import { writeImages } from '../utils/functions';
import Cart from '../db/models/Cart';
import OrderedProduct from '../db/models/OrderedProduct';
import { inclusionsForCart } from '../utils/inclusions';
import OrderedAddon from '../db/models/OrderedAddon';
import { sequelize } from '../db';

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

  async convertGuestAddedItems(items: IGuestAddedProduct[], cart: ICart, transaction?: Transaction): Promise<void> {
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
      }, {
        transaction,
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
          }, { transaction });
        }));
      }
    }));
  }

  async getCart(userId: string, transaction?: Transaction): Promise<Cart> {
    const cart = await Cart.findOne({
      where: {
        userId,
      },
      include: inclusionsForCart,
      transaction,
    });
    return cart;
  }

  private async validateForm(req: Request): Promise<void> {
    const {
      email,
      password,
    } = req.body;
    const incompleteForm = !email || !password;
    if (incompleteForm) {
      throw ApiError.badRequest('Incomplete form');
    }
    const formattedEmail = ['', ''];
    email.split('@').forEach((p: string, i: number) => {
      formattedEmail[i] = p;
    });
    const [local, domain] = formattedEmail;
    const expectedLength = formattedEmail.length === 2;
    const validEmail = expectedLength && local && domain;
    if (!validEmail) {
      throw ApiError.badRequest('Invalid email format');
    }
    const validPassword = /(?=^\S{6,256}$)^.+$/i.test(password);
    if (!validPassword) {
      throw ApiError.badRequest('Invalid password');
    }
    const emailTaken = await User.findOne({ where: { email } });
    if (emailTaken) {
      throw ApiError.conflict('Account with that email already exists');
    }
  }

  async create(req: Request, res: Response) {
    const userForm = req.body;
    if (req.files) {
      writeImages(req);
    }
    const {
      guest,
      password,
    } = userForm;
    let form: IUser;
    if (guest) {
      const guestId = uuidv4();
      form = {
        firstName: '',
        lastName: '',
        id: guestId,
        email: `${guestId}@devicedeal.com`,
        username: `guest-${guestId}`,
        password: await bcrypt.hash(uuidv4(), 5),
        roles: [GUEST],
      };
    } else {
      await this.validateForm(req);
      form = {
        ...userForm,
        id: uuidv4(),
        password: await bcrypt.hash(password, 5),
        roles: [USER],
      };
    }
    let user: User;
    let cart: Cart;
    await sequelize.transaction(async (transaction) => {
      user = await User.create(form, { transaction });
      cart = await Cart.create({
        userId: user.id,
      }, { transaction });
    });
    const token = generateJwt(user, '24h');
    return res.json({ token, cart });
  }

  async createGuest(req: Request, res: Response) {
    // occurs for a user whose only role is "GUEST" e.g. one who was registered automatically by adding an item to the cart
    await this.validateForm(req);
    const {
      email,
      password,
      username,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    const { id } = res.locals.user;
    const updatedObj = await User.update({
      username,
      email,
      password: hashPassword,
      roles: [USER],
    }, { where: { id }, returning: true });
    const token = generateJwt(updatedObj[1][0], '24h');
    return res.json({ token });
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
    if (req.body.guestItems) {
      await this.convertGuestAddedItems(req.body.guestItems, cart);
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
    const updatedVals = req.body;
    const { id } = res.locals.user;
    if (req.files) {
      writeImages(req);
    }
    if ('password' in updatedVals) {
      const hashPassword = await bcrypt.hash(updatedVals.password, 5);
      updatedVals.password = hashPassword;
    }
    const updatedUser = await User.update(updatedVals, { where: { id }, returning: true });
    const token = generateJwt(updatedUser[1][0], '24h');
    return res.json({ token });
  }
}

export default new UserController();
