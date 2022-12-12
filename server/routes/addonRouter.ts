import Router from 'express';
import AddonController from '../controllers/AddonController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => AddonController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => AddonController.create(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res) => AddonController.delete(req, res),
);

export default router;
