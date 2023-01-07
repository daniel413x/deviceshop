/* eslint-disable no-multiple-empty-lines */
import ShopProductPage from '../pages/ShopProductPage';
import FrontPage from '../pages/FrontPage';
import Shop from '../pages/Shop';
import * as routes from './consts';
import LoginRegister from '../pages/LoginRegister';
import Logout from '../pages/Logout';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import YourOrders from '../pages/YourOrders';
import Credentials from '../pages/Credentials';
import Addresses from '../pages/Addresses';
import CreateShopProduct from '../pages/CreateShopProduct';
import createProductPlaceholder from '../assets/images/create-product-placeholder.png';

export const indexAdminRoutes = [
  {
    path: `${routes.ADMIN_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}/${routes.EDIT_ROUTE}/:title`,
    Component: CreateShopProduct,
  },
  {
    path: `${routes.ADMIN_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}/${routes.CREATE_ROUTE}`,
    Component: CreateShopProduct,
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

export const accountNavButtons = [
  {
    to: `/${routes.ACCOUNT_ROUTE}/${routes.ORDERS_ROUTE}`,
    label: 'Orders',
  },
  {
    to: `/${routes.ACCOUNT_ROUTE}/${routes.CREDENTIALS_ROUTE}`,
    label: 'Credentials',
  },
  {
    to: `/${routes.ACCOUNT_ROUTE}/${routes.ADDRESSES_ROUTE}`,
    label: 'Addresses',
  },
];

export const nestedNavButtons = [
  {
    to: '#',
    label: 'Nested Link',
  },
  {
    to: '#',
    label: 'Nested Link Two',
  },
];

export const supportNavButtons = [
  {
    to: '#',
    label: 'Video',
  },
  {
    to: '#',
    label: 'Chat now',
  },
];

export const companyNavButtons = [
  {
    to: '#',
    label: 'About us',
  },
  {
    to: '#',
    label: 'FAQ',
  },
  {
    to: '#',
    label: 'Contact',
  },
  {
    to: '#',
    label: 'Jobs',
  },
  {
    to: nestedNavButtons,
    label: 'Nested',
  },
];

export const shopNavButtons = [
  {
    to: routes.SHOP_PHONES_ROUTE,
    label: 'Phones',
  },
  {
    to: routes.SHOP_PHONES_ROUTE,
    label: 'Laptops',
  },
  {
    to: routes.SHOP_ACCESSORIES_ROUTE,
    label: 'Accessories',
  },
  {
    to: routes.SHOP_TABLETS_ROUTE,
    label: 'Tablets',
  },
  {
    to: routes.SHOP_ROUTE,
    label: '+More',
  },
];

export const navbarButtons = [
  {
    to: shopNavButtons,
    label: 'Shop',
  },
  {
    to: companyNavButtons,
    label: 'Company',
  },
  {
    to: supportNavButtons,
    label: 'Support',
  },
  {
    to: routes.BLOG_ROUTE,
    label: 'Blog',
  },
];

export const navbarAccountButtons = [
  {
    to: routes.ACCOUNT_ROUTE,
    label: 'Main',
  },
  {
    to: routes.LOGOUT_ROUTE,
    label: 'Logout',
  },
];

export const shopFilterButtons = [
  {
    label: 'Category',
    specificationKey: 'Type',
  },
  {
    specificationKey: 'Manufacturer',
  },
  {
    specificationKey: 'Operating system',
  },
  {
    specificationKey: 'Memory',
  },
  {
    specificationKey: 'Storage capacity',
  },
  {
    specificationKey: 'Resolution',
  },
  {
    specificationKey: 'Display size (in)',
  },
  {
    label: 'Camera',
    specificationKey: 'Rear',
  },
  {
    label: 'Battery',
    specificationKey: 'Capacity',
  },
];

export const footerLinkSections = [
  {
    label: 'Company',
    links: companyNavButtons,
  },
  {
    label: 'Support',
    links: supportNavButtons,
  },
  {
    label: 'Shop',
    links: shopNavButtons,
  },
];

export const createProductPlaceholders = [
  createProductPlaceholder,
];
