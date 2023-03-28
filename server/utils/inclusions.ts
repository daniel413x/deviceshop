import Addon from '../db/models/Addon';
import AddressForOrder from '../db/models/AddressForOrder';
import Brand from '../db/models/Brand';
import OrderedAddon from '../db/models/OrderedAddon';
import OrderedProduct from '../db/models/OrderedProduct';
import OrderedShippingMethod from '../db/models/OrderedShippingMethod';
import Review from '../db/models/Review';
import ShopProduct from '../db/models/ShopProduct';
import Specification from '../db/models/Specification';
import SpecificationCategory from '../db/models/SpecificationCategory';
import Type from '../db/models/Type';

export const inclusionsForOrderedAddon = [{
  model: Addon,
  as: 'addon',
}];

export const inclusionsForSpecificationCategory = [
  {
    model: Specification,
    as: 'specifications',
  },
];

export const inclusionsForOrderedProduct = [{
  model: ShopProduct,
  as: 'shopproduct',
  include: [
    {
      model: SpecificationCategory,
      as: 'specificationsByCategory',
      include: inclusionsForSpecificationCategory,
    },
  ],
},
{
  model: OrderedAddon,
  as: 'addons',
  include: [...inclusionsForOrderedAddon],
},
{
  model: Review,
  as: 'review',
}];

export const inclusionsForShopProduct = [
  {
    model: Brand,
    as: 'brand',
  },
  {
    model: Type,
    as: 'type',
  },
  {
    model: SpecificationCategory,
    as: 'specificationsByCategory',
    include: inclusionsForSpecificationCategory,
  },
  {
    model: Review,
    as: 'reviews',
  },
];

export const inclusionsForCart = [
  {
    model: OrderedProduct,
    as: 'cartItems',
    include: [
      ...inclusionsForOrderedProduct,
    ],
  },
];

export const inclusionsForOrder = [
  {
    model: OrderedProduct,
    as: 'orderItems',
    include: [
      ...inclusionsForOrderedProduct,
    ],
  },
  {
    model: AddressForOrder,
    as: 'orderAddress',
  },
  {
    model: OrderedShippingMethod,
    as: 'shippingMethod',
  },
];
