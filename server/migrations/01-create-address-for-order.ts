import { addressForOrderAttributes } from '../db/models/AddressForOrder';

export default {
  up: (queryInterface) => queryInterface.createTable('AddressForOrder', {
    ...addressForOrderAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('AddressForOrder'),
};
