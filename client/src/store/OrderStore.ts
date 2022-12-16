import { makeAutoObservable } from 'mobx';
import {
  IOrder,
} from '../types/types';

export default class OrderStore {
  orders: IOrder[];

  itemsInDb: number;

  confirmationPageOrder: IOrder | undefined;

  constructor() {
    this.orders = [];
    this.confirmationPageOrder = undefined;
    this.itemsInDb = 0;
    makeAutoObservable(this);
  }

  addOrder(order: IOrder) {
    this.orders = [...this.orders, order];
  }

  setConfirmationPageOrder(order: IOrder) {
    this.confirmationPageOrder = order;
  }
}
