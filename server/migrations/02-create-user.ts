import { userAttributes } from '../db/models/User';

export default {
  up: (queryInterface) => queryInterface.createTable('User', {
    ...userAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('User'),
};
