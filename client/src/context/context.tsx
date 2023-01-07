import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import TypeStore from '../store/TypeStore';
import BrandStore from '../store/BrandStore';
import ReviewStore from '../store/ReviewStore';
import ShopPageStore from '../store/ShopPageStore';
import CartStore from '../store/CartStore';
import ModalStore from '../store/ModalStore';
import OrderStore from '../store/OrderStore';
import AddressStore from '../store/AddressStore';
import CreateProductPageStore from '../store/CreateProductPageStore';

interface ContextProps {
  notifications: NotificationStore;
  brands: BrandStore;
  user: UserStore;
  cart: CartStore;
  types: TypeStore;
  orders: OrderStore;
  reviews: ReviewStore;
  shopPage: ShopPageStore;
  modals: ModalStore;
  addresses: AddressStore;
  createProductPage: CreateProductPageStore;
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
  orders: new OrderStore(),
  addresses: new AddressStore(),
  createProductPage: new CreateProductPageStore(),
});

export default Context;
