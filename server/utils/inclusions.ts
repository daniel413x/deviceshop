import Addon from '../db/models/Addon';
import AddressForOrder from '../db/models/AddressForOrder';
import OrderedAddon from '../db/models/OrderedAddon';
import OrderedProduct from '../db/models/OrderedProduct';
import OrderedShippingMethod from '../db/models/OrderedShippingMethod';
import Review from '../db/models/Review';
import ShopProduct from '../db/models/ShopProduct';
import Specification from '../db/models/Specification';

export const inclusionsForOrderedAddon = [{
  model: Addon,
  as: 'addon',
}];

export const inclusionsForOrderedProduct = [{
  model: ShopProduct,
  as: 'shopproduct',
  include: [
    {
      model: Specification,
      as: 'specifications',
    }],
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
