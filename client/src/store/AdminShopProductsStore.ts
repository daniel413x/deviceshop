import { makeAutoObservable } from 'mobx';

export default class AdminShopProductsStore {
  deletedProductsCount: number;

  publicProductsCount: number;

  constructor() {
    this.deletedProductsCount = 0;
    this.publicProductsCount = 0;
    makeAutoObservable(this);
  }

  setDeletedProductsCount(number: number) {
    this.deletedProductsCount = number;
  }

  setPublicProductsCount(number: number) {
    this.publicProductsCount = number;
  }
}
