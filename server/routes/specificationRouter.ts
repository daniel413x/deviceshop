import Router from 'express';
import SpecificationController from '../controllers/SpecificationController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => SpecificationController.get(req, res),
);
router.get(
  '/filter',
  (req, res) => SpecificationController.getFilteredSpecificationsWithCounts(req, res),
);
router.post(
  '/',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => SpecificationController.create(req, res),
);
router.put(
  '/',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => SpecificationController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => SpecificationController.delete(req, res),
);

export default router;
