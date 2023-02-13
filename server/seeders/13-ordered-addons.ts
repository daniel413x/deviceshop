import { v4 as uuid } from 'uuid';
import { addonOneYearInsurance, addonThreeYearWarranty, orderedProductWithAddon } from '../utils/consts';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('OrderedAddon', [
    {
      price: 13000,
      addonId: addonThreeYearWarranty,
      orderedProductId: orderedProductWithAddon,
      category: 'warranty',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 10000,
      addonId: addonOneYearInsurance,
      orderedProductId: orderedProductWithAddon,
      category: 'insurance',
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('OrderedAddon', null, {}),
};
