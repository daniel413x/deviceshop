import { orderedShippingMethodAttributes } from '../db/models/OrderedShippingMethod';

export default {
  up: (queryInterface) => queryInterface.createTable('OrderedShippingMethod', {
    ...orderedShippingMethodAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('OrderedShippingMethod'),
};
