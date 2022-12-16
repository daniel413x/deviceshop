import { shippingMethodAttributes } from '../db/models/ShippingMethod';

export default {
  up: (queryInterface) => queryInterface.createTable('ShippingMethod', {
    ...shippingMethodAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('ShippingMethod'),
};
