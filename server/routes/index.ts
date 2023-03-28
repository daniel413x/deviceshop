import Router from 'express';
import userRouter from './userRouter';
import shopProductRouter from './shopProductRouter';
import orderedProductRouter from './orderedProductRouter';
import orderRouter from './orderRouter';
import cartRouter from './cartRouter';
import addressInAddressBookRouter from './addressInAddressBookRouter';
import reviewRouter from './reviewRouter';
import shopElementRouter from './shopElementRouter';
import testingRouter from './testingRouter';
import typeRouter from './typeRouter';
import brandRouter from './brandRouter';
import specificationRouter from './specificationRouter';
import addonRouter from './addonRouter';
import shippingMethodRouter from './shippingMethodRouter';
import orderedAddonRouter from './orderedAddonRouter';
import specificationCategoryRouter from './specificationCategoryRouter';

const router = Router();

router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/shopproduct', shopProductRouter);
router.use('/addressbook', addressInAddressBookRouter);
router.use('/order', orderRouter);
router.use('/orderedproduct', orderedProductRouter);
router.use('/cart', cartRouter);
router.use('/shopelement', shopElementRouter);
router.use('/specification', specificationRouter);
router.use('/specificationcategory', specificationCategoryRouter);
router.use('/addon', addonRouter);
router.use('/orderedaddon', orderedAddonRouter);
router.use('/shippingmethod', shippingMethodRouter);
router.use('/testing', testingRouter);

export default router;
