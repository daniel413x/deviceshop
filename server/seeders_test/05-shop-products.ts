import { v4 as uuid } from 'uuid';
import {
  apple,
  samsung,
} from './03-brands';
import {
  smartphone as smartphonetypeId,
  laptop as laptoptypeId,
  accessory as accessorytypeId,
  tablet as tablettypeId,
} from './04-types';

export const smartphonesIds = [];
const smartphones = [];

export const laptopsIds = [];
const laptops = [];

export const accessoriesIds = [];
const accessories = [];

export const tabletsIds = [];
const tablets = [];

for (let n = 0; n <= 12; n += 1) {
  let numberSold = 0;
  if (n === 3) {
    numberSold = 3;
  }
  if (n === 4) {
    numberSold = 2;
  }
  if (n === 5) {
    numberSold = 1;
  }
  const smartphoneId = uuid();
  const laptopId = uuid();
  const accessoryId = uuid();
  const tabletId = uuid();
  const makeA53 = n % 2;
  const smartphone = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images: ['test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png'],
    price: 100000,
    discount: 20,
    discountedPrice: 80000,
    name: makeA53 ? `Samsung Galaxy numGB Android 11 5G Smartphone ${n + 1}` : `Apple iPhone numGB iOS 16 5G Smartphone ${n + 1}`,
    // name: `Smartphone ${n + 1}`,
    brandId: makeA53 ? samsung : apple,
    typeId: smartphonetypeId,
    numberSold,
    stock: 10,
    rating: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: smartphoneId,
  };
  if (n === 0) {
    smartphone.rating = 5;
  }
  if (n === 3) {
    smartphone.rating = 4;
  }
  const laptop = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images: ['test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png'],
    price: 100000,
    discount: 20,
    discountedPrice: 80000,
    name: `Laptop ${n + 1}`,
    numberSold: 0,
    stock: 10,
    rating: 0,
    brandId: apple,
    typeId: laptoptypeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: laptopId,
  };
  const accessory = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images: ['test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png'],
    price: 1000,
    discount: 20,
    discountedPrice: 800,
    name: `Accessory ${n + 1}`,
    numberSold: 0,
    stock: 10,
    rating: 0,
    brandId: apple,
    typeId: accessorytypeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: accessoryId,
  };
  const tablet = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images: ['test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png', 'test-product-filler.png'],
    price: 10000,
    discount: 20,
    discountedPrice: 8000,
    name: `Tablet ${n + 1}`,
    numberSold: 0,
    stock: 10,
    rating: 0,
    brandId: apple,
    typeId: tablettypeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: tabletId,
  };
  smartphonesIds.push(smartphoneId);
  smartphones.push(smartphone);
  laptopsIds.push(laptopId);
  laptops.push(laptop);
  accessoriesIds.push(accessoryId);
  accessories.push(accessory);
  tabletsIds.push(tabletId);
  tablets.push(tablet);
}

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('ShopProduct', [
    ...smartphones,
    ...laptops,
    ...accessories,
    ...tablets,
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('ShopProduct', null, {}),
};
