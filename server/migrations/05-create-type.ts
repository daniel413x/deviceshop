import { typeAttributes } from '../db/models/Type';

export default {
  up: (queryInterface) => queryInterface.createTable('Type', {
    ...typeAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('Type'),
};
