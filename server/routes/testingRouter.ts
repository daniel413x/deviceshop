import Router from 'express';
import TestingController from '../controllers/TestingController';

const router = Router();

router.post(
  '/reset',
  (req, res, next) => TestingController.reset(req, res, next),
);

export default router;
