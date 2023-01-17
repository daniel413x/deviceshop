import { makeAutoObservable } from 'mobx';

export default class AdminOrdersStore {
  allOrdersCount: number;

  unshippedOrdersCount: number;

  constructor() {
    this.allOrdersCount = 0;
    this.unshippedOrdersCount = 0;
    makeAutoObservable(this);
  }

  setAllOrdersCount(number: number) {
    this.allOrdersCount = number;
  }

  setUnshippedOrdersCount(number: number) {
    this.unshippedOrdersCount = number;
  }
}
