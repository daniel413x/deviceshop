import UserStore from './UserStore';
import TypeStore from './TypeStore';
import BrandStore from './BrandStore';
import ReviewStore from './ReviewStore';
import ShopPageStore from './ShopPageStore';
import CartStore from './CartStore';
import NotificationStore from './NotificationStore';
import ModalStore from './ModalStore';
import FrontPageStore from './FrontPageStore';
import AddressStore from './AddressStore';
import CreateProductPageStore from './CreateProductPageStore';
import AdminShopProductsStore from './AdminShopProductsStore';
import AdminOrders from './AdminOrdersStore';

const store = {
  notifications: new NotificationStore(),
  user: new UserStore(),
  types: new TypeStore(),
  brands: new BrandStore(),
  reviews: new ReviewStore(),
  shopPage: new ShopPageStore(),
  cart: new CartStore(),
  frontPage: new FrontPageStore(),
  modals: new ModalStore(),
  addresses: new AddressStore(),
  createProductPage: new CreateProductPageStore(),
  adminShopProducts: new AdminShopProductsStore(),
  adminOrders: new AdminOrders(),
};

export default store;
