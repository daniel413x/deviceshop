import { orderAttributes } from '../db/models/Order';

export default {
  up: (queryInterface) => queryInterface.createTable('Order', {
    ...orderAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('Order'),
};
