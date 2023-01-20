import {
  userWithAdmin,
  userWithOrder,
  userWithCartItemsAndSavedAddresses,
  userWithCartItemsAndOrdersAndReviews,
  userWithSavedAddresses,
  cartForUserWithAdmin,
  cartForUserWithOrder,
  cartForUserWithCartItemsAndSavedAddresses,
  cartForUserWithCartItemsAndOrderAndReviews,
  cartForUserWithSavedAddresses,
  cartForThirdUserWithReviews,
  cartForFourthUserWithReviews,
  thirdUserWithAReview,
  cartForSecondUserWithReviews,
  secondUserWithAReview,
} from '../utils/consts';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('Cart', [
    {
      id: cartForUserWithAdmin,
      userId: userWithAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithOrder,
      userId: userWithOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithCartItemsAndSavedAddresses,
      userId: userWithCartItemsAndSavedAddresses,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithCartItemsAndOrderAndReviews,
      userId: userWithCartItemsAndOrdersAndReviews,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForUserWithSavedAddresses,
      userId: userWithSavedAddresses,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForThirdUserWithReviews,
      userId: thirdUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForSecondUserWithReviews,
      userId: secondUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: cartForFourthUserWithReviews,
      userId: secondUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Cart', null, {}),
};
