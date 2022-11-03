import { addressInAddressBookAttributes } from '../db/models/AddressInAddressBook';

export default {
  up: (queryInterface) => queryInterface.createTable('AddressInAddressBook', {
    ...addressInAddressBookAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('AddressInAddressBook'),
};
