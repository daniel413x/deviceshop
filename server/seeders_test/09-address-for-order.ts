import { v4 as uuid } from 'uuid';
import {
  orderForUserWithCartItemsAndOrdersAndReviewsProcessing,
  orderForUserWithCartItemsAndOrdersAndReviewsCanceled,
  orderForUserWithCartItemsAndOrdersAndReviewsDelivered,
} from '../utils/consts';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('AddressForOrder', [
    {
      id: uuid(),
      orderId: orderForUserWithCartItemsAndOrdersAndReviewsProcessing,
      firstName: 'Mccauley',
      lastName: 'Gibbons',
      addressLineOne: '8585 Wisconsin Avenue NW',
      addressLineTwo: '#205',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      orderId: orderForUserWithCartItemsAndOrdersAndReviewsCanceled,
      firstName: 'Mccauley',
      lastName: 'Gibbons',
      addressLineOne: '8585 Wisconsin Avenue NW',
      addressLineTwo: '#205',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      orderId: orderForUserWithCartItemsAndOrdersAndReviewsDelivered,
      firstName: 'Mccauley',
      lastName: 'Gibbons',
      addressLineOne: '8585 Wisconsin Avenue NW',
      addressLineTwo: '#205',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('AddressForOrder', null, {}),
};
