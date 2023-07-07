import Router from 'express';
import BrandController from '../controllers/BrandController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => BrandController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => BrandController.create(req, res),
);
router.put(
  '/',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => BrandController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => BrandController.delete(req, res),
);

export default router;
