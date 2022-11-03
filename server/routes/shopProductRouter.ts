import Router from 'express';
import ShopProductController from '../controllers/ShopProductController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => ShopProductController.get(req, res),
);
router.get(
  '/:name',
  (req, res, next) => ShopProductController.getByName(req, res, next),
);
router.post(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => ShopProductController.create(req, res),
);
router.put(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => ShopProductController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => ShopProductController.delete(req, res),
);

export default router;
