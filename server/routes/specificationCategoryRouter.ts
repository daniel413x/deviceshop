import Router from 'express';
import SpecificationCategoryController from '../controllers/SpecificationCategoryController';

const router = Router();

router.get(
  '/',
  (req, res) => SpecificationCategoryController.get(req, res),
);

export default router;
