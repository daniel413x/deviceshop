import { cartAttributes } from '../db/models/Cart';

export default {
  up: (queryInterface) => queryInterface.createTable('Cart', {
    ...cartAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('Cart'),
};
