import { reviewAttributes } from '../db/models/Review';

export default {
  up: (queryInterface) => queryInterface.createTable('Review', {
    ...reviewAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('Review'),
};
