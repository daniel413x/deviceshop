import { specificationAttributes } from '../db/models/Specification';

export default {
  up: (queryInterface) => queryInterface.createTable('Specification', {
    ...specificationAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('Specification'),
};
