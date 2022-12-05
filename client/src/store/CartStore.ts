import { makeAutoObservable } from 'mobx';
import {
  ICart, IOrderedProduct,
} from '../types/types';

export default class CartStore {
  items: IOrderedProduct[];

  id: string;

  constructor() {
    this.items = [];
    this.id = 'guest';
    makeAutoObservable(this);
  }

  setFetchedCart(cart: ICart) {
    this.items = cart.cartItems;
    this.id = cart.id;
  }

  setItems(newItems: IOrderedProduct[]) {
    this.items = newItems;
  }

  addItem(newItem: IOrderedProduct) {
    this.items = [...this.items, newItem];
  }

  removeItem(removedId: string) {
    this.items = this.items.filter(({ id }) => id !== removedId);
  }
}
