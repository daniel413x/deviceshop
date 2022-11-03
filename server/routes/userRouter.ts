import Router from 'express';
import UserController from '../controllers/UserController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import authMiddleware from '../middleware/authMiddleware';
import { ADMIN, USER } from '../utils/consts';

const router = Router();

router.get(
  '/auth',
  authMiddleware,
  (req, res) => UserController.auth(req, res),
);
router.post(
  '/registration',
  (req, res, next) => UserController.create(req, res, next),
);
router.post(
  '/login',
  (req, res, next) => UserController.login(req, res, next),
);
router.put(
  '/',
  checkRoleMiddleware(USER),
  (req, res) => UserController.edit(req, res),
);
router.delete(
  '/:id',
  checkRoleMiddleware(ADMIN),
  (req, res) => UserController.delete(req, res),
);

export default router;
