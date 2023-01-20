import { makeAutoObservable } from 'mobx';
import {
  ICart, IGuestAddedProduct, IOrderedAddon, IOrderedProduct, IShippingMethod,
} from '../types/types';
import { convertPriceInt, formatPrice } from '../utils/functions';

export default class CartStore {
  items: (IOrderedProduct | IGuestAddedProduct)[];

  id: string;

  shippingMethod: IShippingMethod | undefined;

  constructor() {
    this.items = [];
    this.id = 'GUEST';
    this.shippingMethod = undefined;
    makeAutoObservable(this);
  }

  set(cart: ICart) {
    this.items = cart.cartItems || [];
    this.id = cart.id;
  }

  setItems(newItems: IOrderedProduct[]) {
    this.items = newItems;
  }

  setShippingMethod(shippingMethod: IShippingMethod | undefined) {
    this.shippingMethod = shippingMethod;
  }

  unset() {
    this.items = [];
    this.id = 'guest';
    this.shippingMethod = undefined;
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

  getTotal() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
      if (item.addons && item.addons.length > 0) {
        item.addons.forEach((addon) => {
          total += addon.price;
        });
      }
    });
    return total;
  }

  getTax() {
    const total = this.getTotal();
    return total * 0.05;
  }

  getIntTotal() {
    let total = this.getTotal();
    if (this.shippingMethod) {
      total += this.shippingMethod.price;
    }
    const tax = this.getTax();
    return total + tax;
  }

  getFormattedTotal() {
    return formatPrice(convertPriceInt(this.getIntTotal()));
  }
}
