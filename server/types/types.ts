import {
  Attributes,
  FindOptions as SequelizeFindOptions,
  InferCreationAttributes,
  Model,
  FindAndCountOptions as SequelizeFindAndCountOptions,
  DestroyOptions as SequelizeDestroyOptions,
} from 'sequelize';

export interface IBaseModel {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISpecification {
  id: string;
  category: string;
  key: string;
  value: string;
  shopProductId: string;
  typeId: string;
}

export interface IShopProduct {
  id: string;
  name: string;
  price: number;
  discount: number;
  discountedPrice: number;
  thumbnail: string;
  typeId: string;
  brandId: string;
  images: string[];
  numberSold: number;
  stock: number;
}

export interface IAddon {
  id: string;
  category: string;
  bulletPoints?: string[];
  description?: string;
  name: string;
  price: number;
}

export interface IBaseShippingMethod {
  id: string;
  price: number;
  name: string;
}

export interface IShippingMethod extends IBaseShippingMethod {}

export interface IOrderedShippingMethod extends IShippingMethod {
  id: string;
  price: number;
  name: string;
  orderId: string;
}

export interface IOrderedAddon extends Omit<IAddon, 'bulletPoints' | 'description' | 'name'> {
  orderedProductId: string;
}

export interface IGuestAddedAddon extends IOrderedAddon {
  addon: IAddon;
}

export interface IOrderedProduct {
  id: string;
  orderId?: string;
  cartId?: string;
  shopProductId: string;
  brandId: string;
  typeId: string;
  userId: string;
  addons?: (IOrderedAddon | IGuestAddedAddon)[];
  price: number;
}

export interface IGuestAddedProduct extends Pick<IOrderedProduct, 'addons'> {
  shopproduct: IShopProduct;
}

export interface IType {
  id: string;
  name: string;
}

export interface IBrand {
  id: string;
  name: string;
}

export interface ITypeBrand {
  id: string;
}

export interface IReview {
  id: string;
  rating: number;
  body: string;
  shopProductId: string;
  userId: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  roles: string[];
  avatar?: string;
}

export interface ICart {
  id: string;
  userId: string;
  cartItems?: IOrderedProduct[];
}

export interface IOrder {
  id: string;
  userId: string;
  status: ('Processing' | 'Shipped' | 'Cancellation requested' | 'Canceled' | 'Delivered' | 'Return requested')[];
}

export interface IBaseAddress {
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
  image?: string;
  to?: string;
  reference: string;
}

export interface IAddressForOrder extends IBaseAddress {}

export interface IAddressInAddressBook extends IBaseAddress {
  userId: string;
  isDefault: boolean;
}

export type SpecificationFinder = {
  value: string[];
  key: string;
};

export type UniquePrimarySpecification = Omit<ISpecification, 'category' | 'typeId' | 'shopProductId'> & { // intermediate objects for filtered fetching
  shopProductIds: string[];
};

export type SpecificationWithDeviceCount = Omit<ISpecification, 'category' | 'typeId' | 'shopProductId'> & { // used in filter system
  count: number;
};

export type Filter = Omit<ISpecification, 'id' | 'category' | 'typeId' | 'shopProductId'>;

export type FilteredSearchParams = { specifications: { key: string, value: string }[]; };

export type SearchViaSearchbarParams = { value: string };

// eslint-disable-next-line no-unused-vars
export type IterableAttributes<T> = { [ key in keyof T ]: any };

export type InclusionAttributes<T> = ((keyof T) | [keyof T, string])[] | { exclude: ((keyof T) | [keyof T, string])[] };

// eslint-disable-next-line no-unused-vars
export type ModelAttributes<T extends Model> = { [ key in keyof InferCreationAttributes<T> ]: any }

export type FindOptions<M extends Model> = SequelizeFindOptions<Attributes<M>>;

export type FindAndCountOptions<M extends Model> = Omit<SequelizeFindAndCountOptions<Attributes<M>>, 'group'>

export type DestroyOptions<M extends Model> = SequelizeDestroyOptions<Attributes<M>>
