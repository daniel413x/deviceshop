import Router from 'express';
import OrderedAddonController from '../controllers/OrderedAddonController';

const router = Router();

router.post(
  '/',
  (req, res) => OrderedAddonController.create(req, res),
);
router.delete(
  '/:id',
  (req, res) => OrderedAddonController.delete(req, res),
);

export default router;
