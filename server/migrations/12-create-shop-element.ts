import { shopElementAttributes } from '../db/models/ShopElement';

export default {
  up: (queryInterface) => queryInterface.createTable('ShopElement', {
    ...shopElementAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('ShopElement'),
};
