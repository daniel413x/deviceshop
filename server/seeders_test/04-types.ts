export const smartphone = '046cc6fe-1bef-4e52-b50f-6b1f637cef7f';
export const laptop = '32d5749e-48cb-4c56-8d10-04e2994e03d4';
export const accessory = '0ebf1570-503c-4b08-a438-2699cd498e5f';
export const tablet = '157ac2c5-0162-4a5f-9be9-d6d56d46c60e';
// export const laptop = '29eb1b0b-4fa9-407c-a985-3822f2b033ab';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Type', [
    {
      name: 'Smartphone',
      id: smartphone,
    },
    {
      name: 'Laptop',
      id: laptop,
    },
    {
      name: 'Accessory',
      id: accessory,
    },
    {
      name: 'Tablet',
      id: tablet,
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Type', null, {}),
};
