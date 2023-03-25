import { v4 as uuid } from 'uuid';
import { DELETED, NEW } from '../utils/consts';
import {
  apple,
  samsung,
} from './03-brands';
import {
  smartphone as smartphonetypeId,
  laptop as laptopTypeId,
  accessory as accessoryTypeId,
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

const samsungDesc = 'The Galaxy A53 5G offers you an outstanding multimedia experience with its crystal clear 120 Hz sAMOLED display and versatile cameras. Take beautiful photos with the quad camera, or take full advantage of the performance to play your favorite game.';
const appleDesc = 'A new, larger 6.7-inch size joins the popular 6.1-inch design, featuring a new dual-camera system, Crash Detection, a smartphone industry-first safety service with Emergency SOS via satellite, and the best battery life on iPhone';
const images = ['test-product-filler-1.png', 'test-product-filler-2.png', 'test-product-filler-3.png', 'test-product-filler-4.png', 'test-product-filler-5.png'];

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
  // const even = n % 2 === 0;
  const odd = n % 2;
  const makeSamsung = odd;
  const makeHP = odd;
  const deviceNumber = n + 1;
  const smartphone = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images,
    price: 100000,
    discount: 20,
    discountedPrice: 80000,
    description: makeSamsung ? samsungDesc : appleDesc,
    name: makeSamsung ? `Samsung Galaxy ${n <= 4 ? '256GB' : '128GB'} Android 11 5G Smartphone ${deviceNumber}` : `Apple iPhone ${n <= 4 ? '256GB' : '128GB'} iOS 16 5G Smartphone ${deviceNumber}`,
    // name: `Smartphone ${deviceNumber}`,
    brandId: makeSamsung ? samsung : apple,
    typeId: smartphonetypeId,
    numberSold,
    stock: 10,
    rating: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: smartphoneId,
    flags: [NEW],
  };
  if (n === 0) {
    smartphone.rating = 5;
  }
  if (n === 3) {
    smartphone.rating = 4;
  }
  const laptop = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images,
    price: 100000,
    discount: 20,
    description: `Laptop ${deviceNumber}`,
    discountedPrice: 80000,
    name: makeHP ? `HP Laptop ${deviceNumber}` : `Apple Macbook ${deviceNumber}`,
    numberSold: 0,
    stock: 10,
    rating: 0,
    brandId: apple,
    typeId: laptopTypeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: laptopId,
    flags: [NEW],
  };
  const accessory = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images,
    price: 1000,
    discount: 20,
    discountedPrice: 800,
    description: `Accessory ${deviceNumber}`,
    name: `Accessory ${deviceNumber}`,
    numberSold: 0,
    stock: 10,
    rating: 0,
    brandId: apple,
    typeId: accessoryTypeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: accessoryId,
    flags: [NEW],
  };
  const tablet = {
    thumbnail: 'test-product-filler-thumbnail.png',
    images,
    price: 10000,
    discount: 20,
    description: `Tablet ${deviceNumber}`,
    discountedPrice: 8000,
    name: `Tablet ${deviceNumber}`,
    numberSold: 0,
    stock: 10,
    rating: 0,
    brandId: apple,
    typeId: tablettypeId,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: tabletId,
    flags: [NEW],
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

const recycleBinProduct = {
  thumbnail: 'test-product-filler-thumbnail.png',
  images,
  price: 10000,
  discount: 20,
  description: 'Deleted product',
  discountedPrice: 8000,
  name: 'Apple iPhone 128GB iOS 16 5G Smartphone 13',
  numberSold: 0,
  stock: 10,
  rating: 0,
  brandId: apple,
  typeId: smartphonetypeId,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: uuid(),
  flags: [NEW, DELETED],
};

export default {
  up: async (queryInterface) => queryInterface.bulkInsert('ShopProduct', [
    ...smartphones,
    ...laptops,
    ...accessories,
    ...tablets,
    recycleBinProduct,
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('ShopProduct', null, {}),
};
