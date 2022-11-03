import { FC } from 'react';

export interface IRouterRoute {
  path: string;
  Component: FC;
}

export interface ISpecification {
  id: string;
  category: string;
  key: string;
  value: string;
}

export interface IType {
  id: string;
  name: string;
}

export interface IBrand {
  id: string;
  name: string;
}

export interface IShopProduct {
  id: string;
  name: string;
  price: number;
  discount: number;
  thumbnail: string;
  type: IType;
  brand: IBrand;
  specifications: ISpecification[];
  images: string[];
  rating: number;
  numberSold: number;
  stock: number;
}

export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  phoneNumber?: string;
  roles: string[];
  avatar?: string;
}

export interface IReview {
  id: string;
  rating: number;
  body: string;
  shopProductId: string;
  product: IShopProduct;
  user: IUser;
  userId: string;
}

export interface ICart {
  id: string;
  userId: string;
}

export interface IOrder {
  id: string;
  userId: string;
  status: ('Processing' | 'Shipped' | 'Cancellation Requested' | 'Canceled' | 'Delivered')[];
}

export interface IAddress {
  id: string;
  firstName: string;
  lastName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  zip: string;
  state: string;
}

export interface IShopElement {
  image: string;
  reference: string;
  to: string;
  id: string;
}

export type Link = {
  to: string;
  label: string;
};

export interface INavButton {
  to: string | INavButton[];
  label: string;
}

export type ShopProductAttributes = ('stock' | 'numberSold' | 'rating' | 'images' | 'BrandId' | 'TypeId' | 'thumbnail' | 'discount' | 'price' | 'name' | 'id')[];

export type ShopElementAttributes = ('reference' | 'image')[];

export type TypeAttributes = ('name' | 'id')[];

export type BrandAttributes = ('name' | 'id')[];

export type BlogAttributes = ('title' | ['createdAt', string] | 'thumbnail' | 'id' | 'body' | 'snippet')[];

export type IterableAttributes<T> = { [ key in keyof T ]: any };

export type QueryReqFetchOne<T> = {
  attributes?: T;
};

export type Search = {
  attribute: string;
  value: string;
};

export type QueryReqFetchMultiple<T> = {
  page?: number;
  limit?: number;
  attributes?: T;
  search?: Search;
  where?: any;
};

export type QueryReqFetchMultipleShopProducts = QueryReqFetchMultiple<ShopProductAttributes> & {
  byMostSold?: boolean;
};

export type SequelizeFindAndCountAll<T> = {
  rows: T[];
  count: number;
};

export type RequireAll<T> = Required<T> | Partial<Record<keyof T, undefined>>;
