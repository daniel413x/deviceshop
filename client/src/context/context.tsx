import { createContext } from 'react';
import UserStore from '../store/UserStore';
import TypeStore from '../store/TypeStore';
import ReviewStore from '../store/ReviewStore';

interface ContextProps {
  user: UserStore;
  types: TypeStore;
  reviews: ReviewStore;
}

const Context = createContext<ContextProps>({
  user: new UserStore(),
  types: new TypeStore(),
  reviews: new ReviewStore(),
});

export default Context;
