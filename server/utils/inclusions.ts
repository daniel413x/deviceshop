import Addon from '../db/models/Addon';
import OrderedAddon from '../db/models/OrderedAddon';
import OrderedProduct from '../db/models/OrderedProduct';
import ShopProduct from '../db/models/ShopProduct';
import Specification from '../db/models/Specification';

// eslint-disable-next-line import/prefer-default-export
export const includeOrderedProducts = [
  {
    model: OrderedProduct,
    as: 'cartItems',
    include: [{
      model: ShopProduct,
      as: 'shopproduct',
      include: [{
        model: Specification,
        as: 'specifications',
      }],
    },
    {
      model: OrderedAddon,
      as: 'addons',
      include: [{
        model: Addon,
        as: 'addon',
      }],
    }],
  },
];

export const includeAddon = [
  {
    model: Addon,
    as: 'addon',
  },
];
