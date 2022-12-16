import { v4 as uuid } from 'uuid';
import {
  orderForFourthUserWithAReview, orderForSecondUserWithAReview,
  orderForThirdUserWithAReview,
  orderForUserWithCartItemsAndOrdersAndReviewsCanceled,
  orderForUserWithCartItemsAndOrdersAndReviewsDelivered,
  orderForUserWithCartItemsAndOrdersAndReviewsProcessing,
} from '../utils/consts';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('OrderedShippingMethod', [
    {
      price: 0,
      name: 'One-Day Delivery',
      id: uuid(),
      orderId: orderForUserWithCartItemsAndOrdersAndReviewsProcessing,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      name: 'One-Day Delivery',
      id: uuid(),
      orderId: orderForUserWithCartItemsAndOrdersAndReviewsCanceled,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      name: 'One-Day Delivery',
      id: uuid(),
      orderId: orderForUserWithCartItemsAndOrdersAndReviewsDelivered,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      name: 'One-Day Delivery',
      id: uuid(),
      orderId: orderForSecondUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      name: 'One-Day Delivery',
      id: uuid(),
      orderId: orderForThirdUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      name: 'One-Day Delivery',
      id: uuid(),
      orderId: orderForFourthUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('OrderedShippingMethod', null, {}),
};
