import { Request, Response, NextFunction } from 'express';
import AddressInAddressBook from '../db/models/AddressInAddressBook';
import BaseController from './BaseController';

class AddressInAddressBookController extends BaseController<AddressInAddressBook> {
  constructor() {
    super(AddressInAddressBook);
  }

  get(req: Request, res: Response) {
    this.execFindAndCountAll(req, res);
  }

  async create(req: Request, res: Response) {
    const { id: userId } = res.locals.user;
    if (req.body.isDefault) {
      const previousDefault = await AddressInAddressBook.findAll({ where: { isDefault: true } });
      if (previousDefault) {
        await AddressInAddressBook.update({ isDefault: false }, { where: { userId } });
      }
    }
    this.execCreate(req, res);
  }

  edit(req: Request, res: Response, next: NextFunction) {
    this.execValidateUserAndUpdate(req, res, next);
  }

  delete(req: Request, res: Response, next: NextFunction) {
    this.execValidateUserAndDestroy(req, res, next);
  }
}

export default new AddressInAddressBookController();
