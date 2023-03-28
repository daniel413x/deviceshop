import { specificationCategoryAttributes } from '../db/models/SpecificationCategory';

export default {
  up: (queryInterface) => queryInterface.createTable('SpecificationCategory', {
    ...specificationCategoryAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('SpecificationCategory'),
};
