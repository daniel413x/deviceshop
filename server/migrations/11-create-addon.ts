import { addonAttributes } from '../db/models/Addon';

export default {
  up: (queryInterface) => queryInterface.createTable('Addon', {
    ...addonAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('Addon'),
};
