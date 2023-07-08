import Router from 'express';
import OrderedProductController from '../controllers/OrderedProductController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { GUEST, USER } from '../utils/consts';

const router = Router();

router.post(
  '/',
  checkRoleMiddleware({
    accessRoles: [USER, GUEST],
  }),
  (req, res) => OrderedProductController.create(req, res),
);
router.put(
  '/',
  checkRoleMiddleware({
    accessRoles: [USER],
  }),
  (req, res) => OrderedProductController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [USER, GUEST],
  }),
  (req, res) => OrderedProductController.delete(req, res),
);

export default router;
