import Router from 'express';
import CartController from '../controllers/CartController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN, USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware({
    accessRoles: [USER],
  }),
  (req, res, next) => CartController.getOne(req, res, next),
);
router.post(
  '/',
  checkRoleMiddleware({
    accessRoles: [USER],
  }),
  (req, res) => CartController.create(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => CartController.delete(req, res),
);

export default router;
