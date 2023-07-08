import { makeAutoObservable } from 'mobx';
import {
  ICart, IGuestAddedProduct, IOrderedAddon, IOrderedProduct, IShippingMethod,
} from '../types/types';
import { GUEST } from '../utils/consts';

export default class CartStore {
  items: (IOrderedProduct | IGuestAddedProduct)[];

  id: string;

  userId: string;

  selectedShippingMethod: IShippingMethod | undefined;

  constructor() {
    this.items = [];
    this.id = 'GUEST';
    this.userId = '-1';
    this.selectedShippingMethod = undefined;
    makeAutoObservable(this);
  }

  set(cart: ICart) {
    this.items = cart.cartItems || [];
    this.id = cart.id;
    this.userId = cart.userId;
  }

  setItems(newItems: IOrderedProduct[]) {
    this.items = newItems;
  }

  setSelectedShippingMethod(shippingMethod: IShippingMethod | undefined) {
    this.selectedShippingMethod = shippingMethod;
  }

  unset() {
    this.items = [];
    this.id = 'GUEST';
    this.userId = '-1';
    this.selectedShippingMethod = undefined;
  }

  get isGuest() {
    return this.userId === GUEST;
  }

  addItem(newItem: IOrderedProduct | IGuestAddedProduct) {
    this.items = [...this.items, newItem];
  }

  removeItem(removedId: string) {
    this.items = this.items.filter(({ id }) => id !== removedId);
  }

  addAddon(changedCartItemId: string, addon: IOrderedAddon) {
    const { items } = this;
    const changedCartItem = items.find((item) => item.id === changedCartItemId);
    if (changedCartItem) {
      changedCartItem.addons = changedCartItem.addons?.concat(addon) || [addon];
      this.items = items.map((item) => {
        if (item.id === changedCartItemId) {
          return changedCartItem;
        }
        return item;
      });
    }
  }

  removeAddon(changedCartItemId: string, removedAddonId: string) {
    const { items } = this;
    const changedCartItem = items.find((item) => item.id === changedCartItemId);
    if (changedCartItem) {
      changedCartItem.addons = changedCartItem.addons!.filter((addon) => addon.addonId !== removedAddonId);
      this.items = items.map((item) => {
        if (item.id === changedCartItemId) {
          return changedCartItem;
        }
        return item;
      });
    }
  }

  findOrderedAddon(addonId: string) {
    const { items } = this;
    for (let i = 0; i < items.length; i += 1) {
      const foundAddon = items[i].addons?.find((addon) => addon.addonId === addonId);
      if (foundAddon) {
        return foundAddon;
      }
    }
    return false;
  }
}
