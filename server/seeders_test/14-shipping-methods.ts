import { v4 as uuid } from 'uuid';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('ShippingMethod', [
    {
      price: 3300,
      name: 'One-Day Delivery',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 1200,
      name: 'Standard',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('ShippingMethod', null, {}),
};
