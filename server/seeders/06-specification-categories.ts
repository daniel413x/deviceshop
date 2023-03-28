import { v4 as uuid } from 'uuid';
import {
  smartphonesIds,
  laptopsIds,
  accessoriesIds,
  tabletsIds,
} from './05-shop-products';

export const smartphoneSpecificationCategories = [];
export const laptopSpecificationCategories = [];
export const accessoriesSpecificationCategories = [];
export const tabletSpecificationCategories = [];

for (let i = 0; i < smartphonesIds.length; i += 1) {
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Key specifications',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'General information',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Material',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Display properties',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Operating system',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Camera',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Processor',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Data storage',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'SIM',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Battery',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Connectivity',
    id: uuid(),
  });
  smartphoneSpecificationCategories.push({
    shopProductId: smartphonesIds[i],
    name: 'Dimensions',
    id: uuid(),
  });
}

for (let i = 0; i < laptopsIds.length; i += 1) {
  laptopSpecificationCategories.push({
    shopProductId: laptopsIds[i],
    name: 'General information',
    id: uuid(),
  });
}

for (let i = 0; i < accessoriesIds.length; i += 1) {
  accessoriesSpecificationCategories.push({
    shopProductId: accessoriesIds[i],
    name: 'General information',
    id: uuid(),
  });
}

for (let i = 0; i < tabletsIds.length; i += 1) {
  tabletSpecificationCategories.push({
    shopProductId: tabletsIds[i],
    name: 'General information',
    id: uuid(),
  });
}

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('SpecificationCategory', [
    ...tabletSpecificationCategories,
    ...accessoriesSpecificationCategories,
    ...laptopSpecificationCategories,
    ...smartphoneSpecificationCategories,
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('SpecificationCategory', null, {}),
};
