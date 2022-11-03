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

  create(req: Request, res: Response) {
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
