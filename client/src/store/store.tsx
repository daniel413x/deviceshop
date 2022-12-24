import UserStore from './UserStore';
import TypeStore from './TypeStore';
import BrandStore from './BrandStore';
import ReviewStore from './ReviewStore';
import ShopPageStore from './ShopPageStore';
import CartStore from './CartStore';
import NotificationStore from './NotificationStore';
import ModalStore from './ModalStore';
import OrderStore from './OrderStore';
import AddressStore from './AddressStore';

const store = {
  notifications: new NotificationStore(),
  user: new UserStore(),
  types: new TypeStore(),
  brands: new BrandStore(),
  reviews: new ReviewStore(),
  shopPage: new ShopPageStore(),
  cart: new CartStore(),
  orders: new OrderStore(),
  modals: new ModalStore(),
  addresses: new AddressStore(),
};

export default store;
