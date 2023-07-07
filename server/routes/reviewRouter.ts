import Router from 'express';
import ReviewController from '../controllers/ReviewController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { ADMIN, USER } from '../utils/consts';

const router = Router();

router.get(
  '/',
  (req, res) => ReviewController.get(req, res),
);
router.get(
  '/recentlyreviewed',
  (req, res) => ReviewController.recentReviews(req, res),
);
router.get(
  '/eligibility/:id', // shop product
  checkRoleMiddleware({
    accessRoles: [USER],
  }),
  (req, res) => ReviewController.eligibility(req, res),
);
router.post(
  '/',
  checkRoleMiddleware({
    accessRoles: [USER],
  }),
  (req, res, next) => ReviewController.create(req, res, next),
);
router.put(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [USER],
  }),
  (req, res, next) => ReviewController.update(req, res, next),
);
router.delete(
  '/:id',
  checkRoleMiddleware({
    accessRoles: [ADMIN],
  }),
  (req, res) => ReviewController.delete(req, res),
);

export default router;
