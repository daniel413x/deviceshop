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
router.post(
  '/:id',
  checkRoleMiddleware(USER),
  (req, res, next) => ReviewController.create(req, res, next),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => ReviewController.delete(req, res),
);

export default router;
