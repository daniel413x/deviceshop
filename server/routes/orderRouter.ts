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
router.post(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => OrderController.create(req, res),
);
router.put(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res, next) => OrderController.changeStatus(req, res, next),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => OrderController.delete(req, res),
);

export default router;
