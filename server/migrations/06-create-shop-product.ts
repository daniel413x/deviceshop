import { shopProductAttributes } from '../db/models/ShopProduct';

export default {
  up: (queryInterface) => queryInterface.createTable('ShopProduct', {
    ...shopProductAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('ShopProduct'),
};
