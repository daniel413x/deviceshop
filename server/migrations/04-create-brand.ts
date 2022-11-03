import { brandAttributes } from '../db/models/Brand';

export default {
  up: (queryInterface) => queryInterface.createTable('Brand', {
    ...brandAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('Brand'),
};
