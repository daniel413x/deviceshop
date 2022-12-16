import Router from 'express';
import ShippingMethodController from '../controllers/ShippingMethodController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => ShippingMethodController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => ShippingMethodController.create(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res) => ShippingMethodController.delete(req, res),
);

export default router;
