import Router from 'express';
import AddressInAddressBookController from '../controllers/AddressInAddressBookController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => AddressInAddressBookController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => AddressInAddressBookController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res, next) => AddressInAddressBookController.edit(req, res, next),
);
router.delete(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res, next) => AddressInAddressBookController.delete(req, res, next),
);

export default router;
