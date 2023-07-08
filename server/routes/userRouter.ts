import Router from 'express';
import UserController from '../controllers/UserController';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import authMiddleware from '../middleware/authMiddleware';
import { GUEST, USER } from '../utils/consts';

const router = Router();

router.get(
  '/auth',
  authMiddleware,
  (req, res) => UserController.auth(req, res),
);
router.post(
  '/registration',
  (req, res) => UserController.create(req, res),
);
router.put(
  '/registration/guest',
  checkRoleMiddleware({ accessRoles: [GUEST] }),
  (req, res) => UserController.createGuest(req, res),
);
router.post(
  '/login',
  (req, res, next) => UserController.login(req, res, next),
);
router.put(
  '/',
  checkRoleMiddleware({
    accessRoles: [USER],
  }),
  (req, res) => UserController.edit(req, res),
);

export default router;
