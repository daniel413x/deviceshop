import { makeAutoObservable } from 'mobx';
import {
  ICart, IGuestAddedProduct, IOrderedProduct,
} from '../types/types';

export default class CartStore {
  items: (IOrderedProduct | IGuestAddedProduct)[];

  id: string;

  constructor() {
    this.items = [];
    this.id = 'GUEST';
    makeAutoObservable(this);
  }

  set(cart: ICart) {
    this.items = cart.cartItems || [];
    this.id = cart.id;
  }

  setItems(newItems: IOrderedProduct[]) {
    this.items = newItems;
  }

  unset() {
    this.items = [];
    this.id = 'guest';
  }

  addItem(newItem: IOrderedProduct | IGuestAddedProduct) {
    this.items = [...this.items, newItem];
  }

  removeItem(removedId: string) {
    this.items = this.items.filter(({ id }) => id !== removedId);
  }
}
