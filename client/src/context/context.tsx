import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import TypeStore from '../store/TypeStore';
import BrandStore from '../store/BrandStore';
import ReviewStore from '../store/ReviewStore';
import ShopPageStore from '../store/ShopPageStore';
import CartStore from '../store/CartStore';
import ModalStore from '../store/ModalStore';
import FrontPageStore from '../store/FrontPageStore';
import AddressStore from '../store/AddressStore';
import CreateProductPageStore from '../store/CreateProductPageStore';
import AdminShopProductsStore from '../store/AdminShopProductsStore';
import AdminOrdersStore from '../store/AdminOrdersStore';

interface ContextProps {
  notifications: NotificationStore;
  brands: BrandStore;
  user: UserStore;
  cart: CartStore;
  types: TypeStore;
  frontPage: FrontPageStore;
  reviews: ReviewStore;
  shopPage: ShopPageStore;
  modals: ModalStore;
  addresses: AddressStore;
  createProductPage: CreateProductPageStore;
  adminShopProducts: AdminShopProductsStore;
  adminOrders: AdminOrdersStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
  types: new TypeStore(),
  brands: new BrandStore(),
  reviews: new ReviewStore(),
  shopPage: new ShopPageStore(),
  cart: new CartStore(),
  modals: new ModalStore(),
  frontPage: new FrontPageStore(),
  addresses: new AddressStore(),
  createProductPage: new CreateProductPageStore(),
  adminShopProducts: new AdminShopProductsStore(),
  adminOrders: new AdminOrdersStore(),
});

export default Context;
