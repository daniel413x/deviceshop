export const apple = '22c2bbd3-3660-41c8-9f2c-57ec7d780614';
export const samsung = 'da359368-f351-4e3a-9cd7-5bbab75c6f18';
export const google = 'fec2c7f8-ede0-4146-b16d-249e6eebcee6';
export const asus = '9eb1d718-09d8-49c5-bd6a-bce832455b4d';
// export const samsung = '29eb1b0b-4fa9-407c-a985-3822f2b033ab';

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Brand', [
    {
      name: 'Apple',
      id: apple,
    },
    {
      name: 'Samsung',
      id: samsung,
    },
    {
      name: 'Google',
      id: google,
    },
    {
      name: 'Asus',
      id: asus,
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Brand', null, {}),
};
