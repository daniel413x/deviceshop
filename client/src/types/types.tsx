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
  shopProductId: string;
  typeId: string;
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
  typeId: string;
  brand: IBrand;
  brandId: string;
  specifications: ISpecification[];
  reviews: IReview[];
  images: string[];
  rating: string;
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

export type SpecificationWithDeviceCount = Omit<ISpecification, 'category' | 'shopProductId' | 'typeId'> & {
  count: number;
};

export type SpecificationColumn = Omit<ISpecification, 'value' | 'key' | 'shopProductId' | 'typeId' | 'id'> & {
  values: string[];
};

export type Link = {
  to: string;
  label: string;
};

export type Cache<T> = {
  [number: number]: T[],
};

export interface INavButton {
  to?: string | INavButton[];
  label: string;
  callback?: () => void;
}

export type IterableAttributes<T> = { [ key in keyof T ]: any };

export type QueryReqFetchOne<T> = {
  attributes?: T;
};

export type SearchViaSearchbar = {
  value: string;
};

export type SearchViaFilteredSearch = {
  specifications: Omit<ISpecification, 'category' | 'id' | 'typeId' | 'shopProductId'>[];
};

export type Filter = {
  key: string;
  value: string;
};

export type SearchParamsRecord = {
  [param: string]: string;
};

export type QueryFilterSpecifications = {
  primarySpecificationKey: string;
  filters: Filter[]; // specification.value
};

export type QueryReqFetchMultiple<T> = {
  page?: number;
  limit?: number;
  attributes?: ((keyof T) | [keyof T, string])[];
  searchbar?: SearchViaSearchbar;
  filteredSearch?: SearchViaFilteredSearch;
  where?: Partial<T>;
  order?: any;
};

export type QueryReqFetchMultipleShopProducts = QueryReqFetchMultiple<IShopProduct> & {
  byMostSold?: boolean;
  byLowestPrice?: boolean;
};

export type SequelizeFindAndCountAll<T> = {
  rows: T[];
  count: number;
};

export type RequireAll<T> = Required<T> | Partial<Record<keyof T, undefined>>;

type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;
