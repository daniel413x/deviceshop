import {
  addonFiveYearWarranty, addonOneYearInsurance, addonThreeYearWarranty, addonTwoYearInsurance, addonTwoYearWarranty,
} from '../utils/consts';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Addon', [
    {
      name: '2-Year Warranty Extension',
      category: 'warranty',
      price: 11000,
      bulletPoints: [
        'Upgrade of existing manufacturer warranty',
        'Free return shipment label',
        'The device will be replaced or credited within 24 hours',
      ],
      id: addonTwoYearWarranty,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '3-Year Warranty Extension',
      category: 'warranty',
      bulletPoints: [
        'Extension by 1 year to a total of 3 years',
        'Bring it to the store or send it in',
        'Repair warranty defects free of charge',
        'Replace or credit the current value in case of total loss',
      ],
      price: 13000,
      id: addonThreeYearWarranty,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '5-Year Warranty Extension',
      category: 'warranty',
      price: 15000,
      bulletPoints: [
        'Extension by 3 years to a total of 5 years',
        'Bring it to the store or send it in',
        'Repair warranty defects free of charge',
        'Replace or credit the current value in case of total loss',
      ],
      id: addonFiveYearWarranty,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '1-Year Insurance',
      category: 'insurance',
      bulletPoints: [
        'Drop, impact and display damage',
        'Water and moisture damage',
      ],
      price: 10000,
      id: addonOneYearInsurance,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '2-Year Insurance',
      category: 'insurance',
      bulletPoints: [
        'Drop, impact and display damage',
        'Water and moisture damage',
      ],
      price: 19000,
      id: addonTwoYearInsurance,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Addon', null, {}),
};
