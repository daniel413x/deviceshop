import { orderedAddonAttributes } from '../db/models/OrderedAddon';

export default {
  up: (queryInterface) => queryInterface.createTable('OrderedAddon', {
    ...orderedAddonAttributes,
  }),
  down: (queryInterface) => queryInterface.dropTable('OrderedAddon'),
};
