import bcrypt from 'bcrypt';
import {
  ADMIN,
  USER,
  userWithAdmin,
  userWithOrder,
  userWithCartItemsAndSavedAddresses,
  userWithSavedAddresses,
  userWithCartItemsAndOrdersAndReviews,
  secondUserWithAReview,
  thirdUserWithAReview,
  fourthUserWithAReview,
  userWhoCanWriteReviews,
} from '../utils/consts';

const hashPassword = async () => {
  const hash = await bcrypt.hash('password', 5);
  return hash;
};

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('User', [
    {
      email: 'admin@deviceshop.com',
      firstName: 'Daniel',
      lastName: 'Maramba',
      username: 'admin',
      password: await hashPassword(),
      avatar: 'default-avatar.jpg',
      roles: [USER, ADMIN],
      id: userWithAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithorders@deviceshop.com',
      firstName: 'Taylah',
      lastName: 'Avila',
      username: 'userwithorders',
      password: await hashPassword(),
      avatar: 'default-avatar.jpg',
      roles: [USER],
      id: userWithOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithcartitemsandsavedaddresses@deviceshop.com',
      firstName: 'Emmanuella',
      lastName: 'Pedro',
      username: 'userwithcartitemsandsavedaddresses',
      password: await hashPassword(),
      avatar: 'default-avatar.jpg',
      roles: [USER],
      id: userWithCartItemsAndSavedAddresses,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithsavedaddresses@deviceshop.com',
      firstName: 'Kelsea',
      lastName: 'Sullivan',
      username: 'userwithsavedaddresses',
      password: await hashPassword(),
      avatar: 'default-avatar.jpg',
      roles: [USER],
      id: userWithSavedAddresses,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwithcartitemsandordersandreviews@deviceshop.com',
      firstName: 'Mccauley',
      lastName: 'Gibbons',
      username: 'userwithcartitemsandordersandreviews',
      password: await hashPassword(),
      avatar: 'test-user-1.jpg',
      roles: [USER],
      id: userWithCartItemsAndOrdersAndReviews,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'seconduserwithareview@deviceshop.com',
      firstName: 'Eveleen',
      lastName: 'Andriy',
      username: 'seconduserwithareview',
      password: await hashPassword(),
      avatar: 'test-user-2.jpg',
      roles: [USER],
      id: secondUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'thirduserwithareview@deviceshop.com',
      firstName: 'Kristopher',
      lastName: 'Gu',
      username: 'thirduserwithareview',
      password: await hashPassword(),
      avatar: 'test-user-3.jpg',
      roles: [USER],
      id: thirdUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'fourthuserwithareview@deviceshop.com',
      firstName: 'Asmara',
      lastName: 'Permatasari',
      username: 'asmara95',
      password: await hashPassword(),
      avatar: 'test-user-4.jpg',
      roles: [USER],
      id: fourthUserWithAReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'userwhocanwritereviews@deviceshop.com',
      firstName: 'Joseline',
      lastName: 'Lois',
      username: 'userwhocanwritereviews',
      password: await hashPassword(),
      avatar: 'default-avatar.jpg',
      roles: [USER],
      id: userWhoCanWriteReviews,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};
