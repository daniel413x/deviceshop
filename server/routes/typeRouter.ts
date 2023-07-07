import Router from 'express';
import TypeController from '../controllers/TypeController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => TypeController.get(req, res),
);
router.get(
  '/:name',
  (req, res) => TypeController.execFindOneByParams(req, res),
);
router.post(
  '/',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => TypeController.create(req, res),
);
router.put(
  '/',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => TypeController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => TypeController.delete(req, res),
);

export default router;
