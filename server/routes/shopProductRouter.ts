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
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res, next) => ShopProductController.create(req, res, next),
);
router.put(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res, next) => ShopProductController.edit(req, res, next),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => ShopProductController.delete(req, res),
);

export default router;
