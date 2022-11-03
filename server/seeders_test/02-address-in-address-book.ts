import { v4 as uuidv4 } from 'uuid';
import {
  userWithSavedAddresses,
} from '../utils/consts';

export const addressInAddressBookOne = uuidv4();
export const addressInAddressBookTwo = uuidv4();
export const addressInAddressBookThree = uuidv4();

export default {
  up: (queryInterface) => queryInterface.bulkInsert('AddressInAddressBook', [
    {
      id: addressInAddressBookOne,
      userId: userWithSavedAddresses,
      firstName: 'Kelsea',
      lastName: 'Sullivan',
      addressLineOne: '5353 Connecticut Avenue NW',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: addressInAddressBookTwo,
      userId: userWithSavedAddresses,
      firstName: 'Kelsea',
      lastName: 'Sullivan',
      addressLineOne: '8585 Wisconsin Avenue NW',
      addressLineTwo: '#205',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: addressInAddressBookThree,
      userId: userWithSavedAddresses,
      firstName: 'Kelsea',
      lastName: 'Sullivan',
      addressLineOne: '2094 Yuma Street NW',
      city: 'Washington',
      state: 'DC',
      zip: '20008',
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('AddressInAddressBook', null, {}),
};
