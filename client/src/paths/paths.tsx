import { lazy } from 'react';
import * as routes from '../utils/consts';

const ShopProductPage = lazy(() => import('../pages/ShopProductPage'));
const FrontPage = lazy(() => import('../pages/FrontPage'));
const Shop = lazy(() => import('../pages/Shop'));
const LoginRegister = lazy(() => import('../pages/LoginRegister'));
const Logout = lazy(() => import('../pages/Logout'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Cart/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/Cart/OrderConfirmation'));
const YourOrders = lazy(() => import('../pages/Account/YourOrders'));
const Credentials = lazy(() => import('../pages/Account/Credentials'));
const Addresses = lazy(() => import('../pages/Account/Addresses'));
const CreateShopProduct = lazy(() => import('../pages/Admin/ShopProducts/Create'));
const ShopProducts = lazy(() => import('../pages/Admin/ShopProducts'));
const Admin = lazy(() => import('../pages/Admin'));
const Account = lazy(() => import('../pages/Account'));
const Orders = lazy(() => import('../pages/Admin/Orders'));

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
    path: `${routes.DEMO_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}/${routes.CREATE_ROUTE}`,
    Component: CreateShopProduct,
  },
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
