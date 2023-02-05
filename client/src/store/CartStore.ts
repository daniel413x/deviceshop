import { makeAutoObservable } from 'mobx';
import {
  ICart, IGuestAddedProduct, IOrderedAddon, IOrderedProduct, IShippingMethod,
} from '../types/types';

export default class CartStore {
  items: (IOrderedProduct | IGuestAddedProduct)[];

  id: string;

  selectedShippingMethod: IShippingMethod | undefined;

  constructor() {
    this.items = [];
    this.id = 'GUEST';
    this.selectedShippingMethod = undefined;
    makeAutoObservable(this);
  }

  set(cart: ICart) {
    this.items = cart.cartItems || [];
    this.id = cart.id;
  }

  setItems(newItems: IOrderedProduct[]) {
    this.items = newItems;
  }

  setSelectedShippingMethod(shippingMethod: IShippingMethod | undefined) {
    this.selectedShippingMethod = shippingMethod;
  }

  unset() {
    this.items = [];
    this.id = 'guest';
    this.selectedShippingMethod = undefined;
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
