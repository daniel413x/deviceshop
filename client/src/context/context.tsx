import { createContext } from 'react';
import UserStore from '../store/UserStore';
import TypeStore from '../store/TypeStore';
import ReviewStore from '../store/ReviewStore';
import ShopPageStore from '../store/ShopPageStore';

interface ContextProps {
  user: UserStore;
  types: TypeStore;
  reviews: ReviewStore;
  shopPage: ShopPageStore;
}

const Context = createContext<ContextProps>({
  user: new UserStore(),
  types: new TypeStore(),
  reviews: new ReviewStore(),
  shopPage: new ShopPageStore(),
});

export default Context;
