import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import ApiError from '../error/ApiError';
import { IUser } from '../types/types';
import { USER } from '../utils/consts';
import User from '../db/models/User';
import BaseController from './BaseController';
import { assignBodyAndProcessImages } from '../utils/functions';
import Cart from '../db/models/Cart';

const generateJwt = ({
  id,
  email,
  roles,
  avatar,
  name,
}: any, expiresIn?: string) => jwt.sign(
  {
    id,
    email,
    roles,
    avatar,
    name,
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

  async create(req: Request, res: Response, next: NextFunction) {
    let userForm;
    if (req.files) {
      userForm = assignBodyAndProcessImages(req);
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
    const cart = await Cart.create({
      userId: user.id,
    });
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
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
      },
    });
    return res.json({ token, cart });
  }

  async auth(req: Request, res: Response) {
    const { user } = res.locals;
    const token = generateJwt(user, '24h');
    return res.json({ token });
  }

  async edit(req: Request, res: Response) {
    let updatedVals;
    if (req.files) {
      updatedVals = assignBodyAndProcessImages(req);
    } else {
      updatedVals = req.body;
    }
    if ('password' in updatedVals) {
      const hashPassword = await bcrypt.hash(updatedVals.password, 5);
      updatedVals.password = hashPassword;
    }
    const { id } = res.locals.user;
    const updatedObj = await User.update(updatedVals, { where: { id }, returning: true });
    const token = generateJwt(updatedObj[1][0], '24h');
    return res.json({ token });
  }

  async delete(req: Request, res: Response) {
    this.execDestroy(req, res);
  }
}

export default new UserController();
