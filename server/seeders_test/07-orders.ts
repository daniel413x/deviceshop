import {
  CANCELED,
  DELIVERED,
  fourthUserWithAReview,
  orderForSecondUserWithAReview,
  orderForThirdUserWithAReview,
  orderForFourthUserWithAReview,
  orderForUserWithCartItemsAndOrdersAndReviewsCanceled,
  orderForUserWithCartItemsAndOrdersAndReviewsDelivered,
  orderForUserWithCartItemsAndOrdersAndReviewsProcessing,
  PROCESSING,
  secondUserWithAReview,
  thirdUserWithAReview,
  userWithCartItemsAndOrdersAndReviews,
} from '../utils/consts';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Order', [
    {
      status: [PROCESSING],
      id: orderForUserWithCartItemsAndOrdersAndReviewsProcessing,
      userId: userWithCartItemsAndOrdersAndReviews,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: [CANCELED],
      id: orderForUserWithCartItemsAndOrdersAndReviewsCanceled,
      userId: userWithCartItemsAndOrdersAndReviews,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: [DELIVERED],
      id: orderForUserWithCartItemsAndOrdersAndReviewsDelivered,
      userId: userWithCartItemsAndOrdersAndReviews,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: [DELIVERED],
      id: orderForSecondUserWithAReview,
      userId: secondUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: [DELIVERED],
      id: orderForThirdUserWithAReview,
      userId: thirdUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: [DELIVERED],
      id: orderForFourthUserWithAReview,
      userId: fourthUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Order', null, {}),
};
