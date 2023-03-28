import { v4 as uuid } from 'uuid';
import { smartphone, laptop, tablet, accessory } from './04-types';
import {
  smartphonesIds,
  laptopsIds,
  accessoriesIds,
  tabletsIds,
} from './05-shop-products';
import {
  smartphoneSpecificationCategories,
  laptopSpecificationCategories,
  accessoriesSpecificationCategories,
  tabletSpecificationCategories,
} from './06-specification-categories';

const smartphoneSpecifications = [];
const laptopSpecifications = [];
const accessoriesSpecifications = [];
const tabletSpecifications = [];

for (let n = 0; n <= 12; n += 1) {
  const odd = n % 2;
  const makeSamsung = odd;
  const matchedSmartphoneSpecificationCategories = smartphoneSpecificationCategories.filter((obj) => obj.shopProductId === smartphonesIds[n]);
  for (let j = 0; j < matchedSmartphoneSpecificationCategories.length; j += 1) {
    const {
      id: specificationCategoryId,
    } = matchedSmartphoneSpecificationCategories[j];
    const genericSpecification = () => ({
      key: 'Key',
      value: 'Value',
      specificationCategoryId,
      id: uuid(),
      typeId: smartphone,
      shopProductId: smartphonesIds[n],
    });
    if (matchedSmartphoneSpecificationCategories[j].name === 'General information') {
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Model name',
        value: makeSamsung ? 'Galaxy A53' : 'iPhone 14',
      });
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Manufacturer',
        value: makeSamsung ? 'Samsung' : 'Apple',
      });
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Type',
        value: 'Smartphone',
      });
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Key specifications') {
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Material') {
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Display properties') {
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Display size (in)',
        value: makeSamsung ? '6.50"' : '6.10"',
      });
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Resolution',
        value: '2400x1080',
      });
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Ratio',
        value: makeSamsung ? '20:9' : '19.5:9',
      });
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Operating system') {
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Operating system',
        value: makeSamsung ? 'Android 11' : 'iOS 16',
      });
      smartphoneSpecifications.push(genericSpecification());
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Camera') {
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Front',
        value: makeSamsung ? '32MP' : '12MP',
      });
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Rear',
        value: makeSamsung ? '64MP' : '48MP',
      });
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Processor') {
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Data storage') {
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Memory',
        value: '6GB',
      });
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Storage capacity',
        value: n <= 4 ? '256GB' : '128GB',
      });
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'SIM') {
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Battery') {
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Capacity',
        value: makeSamsung ? '5,000mAH' : '4,325mAh',
      });
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Connectivity') {
      smartphoneSpecifications.push({
        ...genericSpecification(),
        key: 'Standard',
        value: '5G',
      });
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
    }
    if (matchedSmartphoneSpecificationCategories[j].name === 'Dimensions') {
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
      smartphoneSpecifications.push(genericSpecification());
    }
  }

  const makeHP = odd;
  const matchedLaptopSpecificationCategories = laptopSpecificationCategories.filter((obj) => obj.shopProductId === laptopsIds[n]);
  for (let j = 0; j < matchedLaptopSpecificationCategories.length; j += 1) {
    const {
      id: specificationCategoryId,
    } = matchedLaptopSpecificationCategories[j];
    const genericSpecification = () => ({
      key: 'Key',
      value: 'Value',
      specificationCategoryId,
      id: uuid(),
      typeId: laptop,
      shopProductId: laptopsIds[n],
    });
    if (matchedLaptopSpecificationCategories[j].name === 'General information') {
      laptopSpecifications.push({
        ...genericSpecification(),
        key: 'Manufacturer',
        value: makeHP ? 'HP' : 'Apple',
      });
      laptopSpecifications.push({
        ...genericSpecification(),
        key: 'Type',
        value: 'Laptop',
      });
      laptopSpecifications.push(genericSpecification());
      laptopSpecifications.push(genericSpecification());
    }
  }

  const matchedAccessorySpecificationCategories = accessoriesSpecificationCategories.filter((obj) => obj.shopProductId === accessoriesIds[n]);
  for (let j = 0; j < matchedAccessorySpecificationCategories.length; j += 1) {
    const {
      id: specificationCategoryId,
    } = matchedAccessorySpecificationCategories[j];
    const genericSpecification = () => ({
      key: 'Key',
      value: 'Value',
      specificationCategoryId,
      id: uuid(),
      typeId: accessory,
      shopProductId: accessoriesIds[n],
    });
    accessoriesSpecifications.push({
      ...genericSpecification(),
      key: 'Type',
      value: 'Accessory',
    });
    accessoriesSpecifications.push(genericSpecification());
    accessoriesSpecifications.push(genericSpecification());
    accessoriesSpecifications.push(genericSpecification());
  }

  const matchedTabletSpecificationCategories = tabletSpecificationCategories.filter((obj) => obj.shopProductId === tabletsIds[n]);
  for (let j = 0; j < matchedTabletSpecificationCategories.length; j += 1) {
    const {
      id: specificationCategoryId,
    } = matchedTabletSpecificationCategories[j];
    const genericSpecification = () => ({
      key: 'Key',
      value: 'Value',
      specificationCategoryId,
      id: uuid(),
      typeId: tablet,
      shopProductId: tabletsIds[n],
    });
    tabletSpecifications.push({
      ...genericSpecification(),
      key: 'Type',
      value: 'Tablet',
    });
    tabletSpecifications.push(genericSpecification());
    tabletSpecifications.push(genericSpecification());
    tabletSpecifications.push(genericSpecification());
  }
}

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('Specification', [
    ...smartphoneSpecifications,
    ...laptopSpecifications,
    ...accessoriesSpecifications,
    ...tabletSpecifications,
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Specification', null, {}),
};
