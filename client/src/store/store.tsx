import UserStore from './UserStore';
import TypeStore from './TypeStore';
import BrandStore from './BrandStore';
import ReviewStore from './ReviewStore';
import ShopPageStore from './ShopPageStore';

const store = {
  user: new UserStore(),
  types: new TypeStore(),
  brands: new BrandStore(),
  reviews: new ReviewStore(),
  shopPage: new ShopPageStore(),
};

export default store;
