import { makeAutoObservable } from 'mobx';
import {
  IShopProduct,
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

  pleaseLoginAddItem?: IShopProduct | false;

  constructor() {
    this.roles = ['GUEST'];
    this.id = 'GUEST';
    this.username = 'Guest';
    this.firstName = '';
    this.lastName = '';
    this.avatar = 'default-avatar.jpg';
    this.email = '';
    this.pleaseLoginAddItem = false;
    makeAutoObservable(this);
  }

  set(obj: IUser) {
    const {
      roles,
      id,
      username,
      avatar,
      email,
    } = obj;
    this.roles = roles;
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.email = email;
  }

  unset() {
    this.roles = [GUEST];
    this.id = localStorage.getItem('guestId')!;
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

  setPleaseLoginAddItem(arg: IShopProduct | false) {
    this.pleaseLoginAddItem = arg;
  }
}
