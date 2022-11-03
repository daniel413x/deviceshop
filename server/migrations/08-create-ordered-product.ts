import { orderedProductAttributes } from '../db/models/OrderedProduct';

export default {
  up: (queryInterface) => queryInterface.createTable('OrderedProduct', {
    ...orderedProductAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('OrderedProduct'),
};
