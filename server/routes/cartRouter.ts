import Router from 'express';
import CartController from '../controllers/CartController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN, USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware(USER),
  (req, res, next) => CartController.getOne(req, res, next),
);
router.post(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => CartController.create(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => CartController.delete(req, res),
);

export default router;
