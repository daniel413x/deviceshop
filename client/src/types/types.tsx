import { FC, ReactElement } from 'react';

export type RequireAll<T> = Required<T> | Partial<Record<keyof T, undefined>>;

type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IterableAttributes<T> = { [ key in keyof T ]: any };

export type InclusionAttributes<T> = ((keyof T) | [keyof T, string])[] | { exclude: ((keyof T) | [keyof T, string])[] };

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
  description: string;
  price: number;
  discount: number;
  discountedPrice: number;
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
  flags: string[];
}

export interface IAddon {
  id: string;
  name: string;
  category: string;
  price: number;
  bulletPoints?: string[];
  description?: string;
}

export interface IOrderedAddon extends Omit<IAddon, 'name' | 'bulletPoints' | 'description'> {
  orderedProductId: string;
  addonId: string;
  addon: IAddon;
}

export interface IOrderedProduct {
  id: string;
  price: number;
  typeId: string;
  brandId: string;
  cartId?: string;
  orderId?: string;
  shopProductId: string;
  shopproduct: IShopProduct;
  userId: string;
  createdAt: string;
  guestAddedId?: string;
  addons: IOrderedAddon[];
  order?: IOrder;
  review?: IReview;
  updatedAt?: string;
}

export interface IGuestAddedProduct extends Pick<IOrderedProduct, 'shopproduct' | 'addons' | 'id' | 'price'> {}

export interface IUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  phoneNumber?: string;
  roles: string[];
  avatar: string;
  addresses: IAddress[];
}

export interface IReview {
  id: string;
  rating: number;
  body: string;
  shopProductId: string;
  orderedProductId: string;
  shopproduct: IShopProduct;
  orderedproduct: IOrderedProduct;
  user: IUser;
  userId: string;
  createdAt: string;
  updatedAt: string;
  order: IOrder;
}

export interface ICart {
  id: string;
  userId: string;
  cartItems: IOrderedProduct[];
}

export type OrderStatusStrings = ('Processing' | 'Shipped' | 'Cancellation requested' | 'Canceled' | 'Delivered' | 'Return requested');

export interface IOrder {
  id: string;
  userId: string;
  status: OrderStatusStrings[];
  shippingMethod: IShippingMethod;
  orderItems: IOrderedProduct[];
  total: number;
  orderAddress: IAddress;
  createdAt: string;
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
  company?: string;
  userId: string;
}

export interface IAddressInAddressBook extends IAddress {
  isDefault?: boolean;
}

export interface IShopElement {
  image: string;
  reference: string;
  to: string;
  id: string;
}

export interface INotification {
  messageLineOne?: string;
  messageLineTwo?: string;
  color?: string;
  image?: string;
  timeout: number;
  id: number;
}

export interface IModal {
  component: JSX.Element;
  props: any;
}

export interface IShippingMethod {
  id: string;
  price: number;
  name: string;
}

export interface INavButton {
  to?: string | INavButton[];
  label: string;
  callback?: () => void;
}

export type SpecificationWithDeviceCount = Omit<ISpecification, 'category' | 'shopProductId' | 'typeId'> & {
  count: number;
};

export type SpecificationColumn = Omit<ISpecification, 'value' | 'key' | 'shopProductId' | 'typeId' | 'id'> & {
  values: string[];
};

export type QueryReqFetchOne<T> = {
  attributes?: T;
};

export type QueryResUserAuthed = {
  user: Omit<IUser, 'phoneNumber'>;
  cart: ICart;
};

export type QueryReqRegistration = {
  email: string;
  password: string;
  username: string;
  guestAddedItems?: IGuestAddedProduct[];
};

export type QueryReqLogin = {
  emailOrUsername: string;
  password: string;
  guestAddedItems?: IGuestAddedProduct[];
};

export type QueryReqCreateAddon = Omit<IOrderedAddon, 'id'>;

export type QueryReqCreateOrderedAddon = Pick<IOrderedAddon, 'price' | 'orderedProductId' | 'addonId' | 'category'>;

export type QueryReqCreateAddress = Omit<IAddressInAddressBook, 'id'>;

export type QueryReqCreateShopProduct = Omit<IShopProduct, 'id' | 'type' | 'brand' | 'reviews' | 'rating' | 'numberSold' | 'discountedPrice' | 'thumbnail'>;

export type QueryReqUpdateShopProduct = FormData | Partial<IShopProduct>;

export type QueryReqCreateReview = Omit<IReview, 'id' | 'shopproduct' | 'orderedproduct' | 'user' | 'createdAt' | 'updatedAt' | 'order'> & {
  orderId: string;
};

export type QueryReqPutOrder = Partial<IOrder>;

export type QueryReqPutUser = Partial<IUser & FormData>;

export type QueryResPostShopProduct = {
  newProductSpecifications: ISpecification[];
  newProduct: IShopProduct;
};

export type CCDebitPayment = {
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
};

export type PaymentMethod = 'Credit/debit card' | 'PayPal' | 'Google Pay' | 'Crypto';

export type QueryReqCreateOrder = {
  address: Omit<IAddress, 'id' | 'userId'>;
  paymentMethod: PaymentMethod;
  payment: CCDebitPayment;
  shippingMethod: string; // stringify
  total: number;
};

export type QueryReqCreateShippingMethod = Omit<IShippingMethod, 'id'>;

export type SearchViaSearchbar = {
  value: string;
};

export type SearchViaFilteredSearch = {
  specifications: Omit<ISpecification, 'category' | 'id' | 'typeId' | 'shopProductId'>[];
};

export type AddonChoice = Omit<IAddon, 'orderedProductId' | 'id'> & {
  bulletPoints: string[];
};

export type Filter = {
  key: string;
  value: string;
};

export type Children = ReactElement | string | false | undefined | number | (ReactElement | string | false | undefined | number)[];

export type SearchParamsRecord = {
  [param: string]: string;
};

export type QueryFilterSpecifications = {
  primarySpecificationKey: string;
  filters: Filter[]; // specification.value
};

export type QueryReqOrderedProduct = Omit<IOrderedProduct, 'id' | 'createdAt' | 'shopproduct' | 'addons'>;

export type QueryReqFetchMultiple<T> = {
  countOnly?: boolean;
  page?: number;
  limit?: number;
  attributes?: InclusionAttributes<T>;
  search?: string;
  searchAttribute?: string;
  filters?: SearchViaFilteredSearch;
  where?: Partial<T>;
  order?: any;
  distinct?: boolean;
  associationAttributes?: [string[], InclusionAttributes<any>][]; // model alias (like chain selector), attributes to include
};

type FetchShopProductsProps = {
  byMostSold?: boolean;
  byLowestPrice?: boolean;
  deleted?: boolean;
};

export type QueryReqFetchMultipleShopProducts = QueryReqFetchMultiple<IShopProduct> & FetchShopProductsProps;

type FetchOrdersProps = {
  canceled?: boolean;
  unshipped?: boolean;
};

export type QueryReqFetchMultipleOrders = QueryReqFetchMultiple<IOrder> & FetchOrdersProps;

export type QueryReqFetchMultipleAny<T> = QueryReqFetchMultiple<T> & FetchShopProductsProps & FetchOrdersProps;

export type SequelizeFindAndCountAll<T> = {
  rows: T[];
  count: number;
};
