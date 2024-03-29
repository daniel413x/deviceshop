import { makeAutoObservable } from 'mobx';
import {
  IAddressInAddressBook,
  IUser,
} from '../types/types';
import { ADMIN, GUEST, USER } from '../utils/consts';

export default class UserStore implements IUser {
  roles: string[];

  id: string;

  avatar: string;

  email: string;

  phoneNumber?: string;

  username: string;

  firstName?: string;

  lastName?: string;

  loginToCheckout?: boolean;

  addresses: IAddressInAddressBook[];

  constructor() {
    this.roles = ['GUEST'];
    this.id = 'GUEST';
    this.username = 'Guest';
    this.firstName = '';
    this.lastName = '';
    this.avatar = 'default-avatar.jpg';
    this.email = '';
    this.loginToCheckout = false;
    this.addresses = [];
    makeAutoObservable(this);
  }

  set(obj: IUser) {
    const {
      roles,
      id,
      username,
      avatar,
      email,
      firstName,
      lastName,
      phoneNumber,
    } = obj;
    this.roles = roles;
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  unset() {
    this.roles = [GUEST];
    this.id = GUEST;
    this.username = 'Guest';
    this.avatar = '';
    this.email = '';
  }

  get isGuest() {
    return this.roles.indexOf(GUEST) >= 0;
  }

  get isRegistered() {
    return this.roles.indexOf(USER) >= 0;
  }

  get isAdmin() {
    return this.roles.indexOf(ADMIN) >= 0;
  }

  setId(str: string) {
    this.id = str;
  }

  setAvatar(str: string) {
    this.avatar = str;
  }

  setEmail(str: string) {
    this.email = str;
  }

  setAddresses(arr: IAddressInAddressBook[]) {
    this.addresses = arr;
  }

  setLoginToCheckout(bool: boolean) {
    this.loginToCheckout = bool;
  }
}
