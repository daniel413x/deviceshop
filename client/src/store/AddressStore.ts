import { makeAutoObservable } from 'mobx';
import {
  IAddress,
  IAddressInAddressBook, SequelizeFindAndCountAll,
} from '../types/types';

export default class AddressStore {
  addresses: IAddressInAddressBook[];

  constructor() {
    this.addresses = [];
    makeAutoObservable(this);
  }

  setAddresses(fetchedData: SequelizeFindAndCountAll<IAddressInAddressBook>) {
    this.addresses = fetchedData.rows;
  }

  addAddress(address: IAddress) {
    this.handlePreviousDefault();
    this.addresses = [...this.addresses, address];
  }

  updateAddress(updatedAddress: IAddress) {
    this.handlePreviousDefault();
    this.addresses = this.addresses.map((address) => {
      if (updatedAddress.id === address.id) {
        return updatedAddress;
      }
      return address;
    });
  }

  removeAddress(removedId: string) {
    this.addresses = this.addresses.filter(({ id }) => removedId !== id);
  }

  handlePreviousDefault() {
    const previousDefault = this.addresses.find((defaultAddress) => defaultAddress.isDefault);
    if (previousDefault) {
      previousDefault.isDefault = false;
      this.addresses = this.addresses.map((updatedAddress) => {
        if (updatedAddress.id === previousDefault.id) {
          return previousDefault;
        }
        return updatedAddress;
      });
    }
  }

  get all() {
    return this.addresses;
  }
}
