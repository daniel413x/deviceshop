import Router from 'express';
import TypeController from '../controllers/TypeController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => TypeController.get(req, res),
);
router.post(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => TypeController.create(req, res),
);
router.put(
  '/',
  checkRoleMiddleware(ADMIN),
  (req, res) => TypeController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => TypeController.delete(req, res),
);

export default router;
