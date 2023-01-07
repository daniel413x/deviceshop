import { makeAutoObservable } from 'mobx';
import {
  IBrand, SequelizeFindAndCountAll,
} from '../types/types';

export default class BrandStore {
  brands: IBrand[];

  itemsInDb: number;

  constructor() {
    this.brands = [];
    this.itemsInDb = 1;
    makeAutoObservable(this);
  }

  set(fetchedData: SequelizeFindAndCountAll<IBrand>) {
    this.brands = fetchedData.rows;
    this.itemsInDb = fetchedData.count;
  }

  findBrand(string: string) {
    const returnedBrand = this.brands.find((brand) => brand.name === string);
    return returnedBrand;
  }

  get all() {
    return this.brands;
  }
}
