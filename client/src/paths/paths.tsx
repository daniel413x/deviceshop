import ShopProductPage from '../pages/ShopProductPage';
import FrontPage from '../pages/FrontPage';
import Shop from '../pages/Shop';
import * as routes from '../utils/consts';
import LoginRegister from '../pages/LoginRegister';
import Logout from '../pages/Logout';
import Cart from '../pages/Cart';
import Checkout from '../pages/Cart/Checkout';
import OrderConfirmation from '../pages/Cart/OrderConfirmation';
import YourOrders from '../pages/Account/YourOrders';
import Credentials from '../pages/Account/Credentials';
import Addresses from '../pages/Account/Addresses';
import CreateShopProduct from '../pages/Admin/ShopProducts/Create';
import ShopProducts from '../pages/Admin/ShopProducts';
import Admin from '../pages/Admin';
import Account from '../pages/Account';
import Orders from '../pages/Admin/Orders';

export const indexAdminRoutes = [
  {
    path: `${routes.ADMIN_ROUTE}/${routes.ORDERS_ROUTE}`,
    Component: Orders,
  },
  {
    path: `${routes.ADMIN_ROUTE}/${routes.ORDERS_ROUTE}/${routes.UNSHIPPED}`,
    Component: Orders,
  },
  {
    path: `${routes.ADMIN_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}/${routes.EDIT_ROUTE}/:title`,
    Component: CreateShopProduct,
  },
  {
    path: `${routes.ADMIN_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}/${routes.CREATE_ROUTE}`,
    Component: CreateShopProduct,
  },
  {
    path: `${routes.ADMIN_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}/${routes.DELETED_ROUTE}`,
    Component: ShopProducts,
  },
  {
    path: `${routes.ADMIN_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}`,
    Component: ShopProducts,
  },
  {
    path: `${routes.ADMIN_ROUTE}`,
    Component: Admin,
  },
];

export const indexAuthRoutes = [
  {
    path: `${routes.ACCOUNT_ROUTE}/${routes.ADDRESSES_ROUTE}`,
    Component: Addresses,
  },
  {
    path: `${routes.ACCOUNT_ROUTE}/${routes.CREDENTIALS_ROUTE}`,
    Component: Credentials,
  },
  {
    path: `${routes.ACCOUNT_ROUTE}/${routes.ORDERS_ROUTE}/:id`,
    Component: OrderConfirmation,
  },
  {
    path: `${routes.ACCOUNT_ROUTE}/${routes.ORDERS_ROUTE}`,
    Component: YourOrders,
  },
  {
    path: `${routes.ACCOUNT_ROUTE}`,
    Component: Account,
  },
  {
    path: `${routes.CART_ROUTE}/${routes.CHECKOUT_ROUTE}/${routes.CONFIRMATION_ROUTE}/:id`,
    Component: OrderConfirmation,
  },
  {
    path: `${routes.CART_ROUTE}/${routes.CHECKOUT_ROUTE}`,
    Component: Checkout,
  },
];

export const indexPublicRoutes = [
  {
    path: `${routes.SHOP_ROUTE}/:title`,
    Component: ShopProductPage,
  },
  {
    path: routes.CART_ROUTE,
    Component: Cart,
  },
  {
    path: routes.SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: routes.LOGOUT_ROUTE,
    Component: Logout,
  },
  {
    path: routes.LOGIN_ROUTE,
    Component: LoginRegister,
  },
  {
    path: routes.REGISTER_ROUTE,
    Component: LoginRegister,
  },
  {
    path: routes.INDEX_ROUTE,
    Component: FrontPage,
  },
];
