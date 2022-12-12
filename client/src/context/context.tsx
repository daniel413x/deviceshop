import { createContext } from 'react';
import NotificationStore from '../store/NotificationStore';
import UserStore from '../store/UserStore';
import TypeStore from '../store/TypeStore';
import ReviewStore from '../store/ReviewStore';
import ShopPageStore from '../store/ShopPageStore';
import CartStore from '../store/CartStore';
import ModalStore from '../store/ModalStore';

interface ContextProps {
  notifications: NotificationStore;
  user: UserStore;
  cart: CartStore;
  types: TypeStore;
  reviews: ReviewStore;
  shopPage: ShopPageStore;
  modals: ModalStore;
}

const Context = createContext<ContextProps>({
  notifications: new NotificationStore(),
  user: new UserStore(),
  types: new TypeStore(),
  reviews: new ReviewStore(),
  shopPage: new ShopPageStore(),
  cart: new CartStore(),
  modals: new ModalStore(),
});

export default Context;
