import { v4 as uuid } from 'uuid';
import { orderedProductWithAddon } from '../utils/consts';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Addon', [
    {
      name: '3-Year Warranty Extension',
      price: 3100,
      orderedProductId: orderedProductWithAddon,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '1-Year Insurance',
      price: 10000,
      orderedProductId: orderedProductWithAddon,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Addon', null, {}),
};
