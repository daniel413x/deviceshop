import { v4 as uuid } from 'uuid';
import {
  fourthUserWithAReview,
  secondUserWithAReview,
  thirdUserWithAReview,
  userWithCartItemsAndOrdersAndReviews,
} from '../utils/consts';
import { smartphonesIds } from './05-shop-products';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Review', [
    {
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rating: 5,
      shopProductId: smartphonesIds[0],
      userId: userWithCartItemsAndOrdersAndReviews,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rating: 4,
      shopProductId: smartphonesIds[3],
      userId: userWithCartItemsAndOrdersAndReviews,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rating: 3,
      shopProductId: smartphonesIds[3],
      userId: userWithCartItemsAndOrdersAndReviews,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 5,
      shopProductId: smartphonesIds[0],
      userId: secondUserWithAReview,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 5,
      shopProductId: smartphonesIds[0],
      userId: thirdUserWithAReview,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      rating: 5,
      shopProductId: smartphonesIds[0],
      userId: fourthUserWithAReview,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Review', null, {}),
};
