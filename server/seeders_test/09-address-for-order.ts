import { v4 as uuid } from 'uuid';
import {
  addressForOrderForUserWithCartItemsAndOrdersAndReviews,
} from '../utils/consts';

export default {
  up: (queryInterface) => queryInterface.bulkInsert('AddressForOrder', [
    {
      id: uuid(),
      orderId: addressForOrderForUserWithCartItemsAndOrdersAndReviews,
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
      orderId: addressForOrderForUserWithCartItemsAndOrdersAndReviews,
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
      orderId: addressForOrderForUserWithCartItemsAndOrdersAndReviews,
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
