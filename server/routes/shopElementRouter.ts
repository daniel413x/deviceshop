import Router from 'express';
import ShopElementController from '../controllers/ShopElementController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => ShopElementController.get(req, res),
);
router.get(
  '/:reference',
  (req, res) => ShopElementController.getByReference(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => ShopElementController.create(req, res),
);
router.put(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => ShopElementController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => ShopElementController.delete(req, res),
);

export default router;
