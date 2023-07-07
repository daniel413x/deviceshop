import Router from 'express';
import AddonController from '../controllers/AddonController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { GUEST, USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => AddonController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware({
    accessRoles: [USER, GUEST],
  }),
  (req, res) => AddonController.create(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [USER, GUEST],
  }),
  (req, res) => AddonController.delete(req, res),
);

export default router;
