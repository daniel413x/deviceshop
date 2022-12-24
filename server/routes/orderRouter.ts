import Router from 'express';
import OrderController from '../controllers/OrderController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN, USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => OrderController.get(req, res),
);
router.get(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res, next) => OrderController.getOne(req, res, next),
);
router.post(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => OrderController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res, next) => OrderController.edit(req, res, next),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => OrderController.delete(req, res),
);

export default router;
