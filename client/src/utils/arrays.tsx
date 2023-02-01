import * as routes from './consts';
import createProductPlaceholder from '../assets/images/create-product-placeholder.png';

export const accountSideColLinks = [
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

export const adminSideColLinks = [
  {
    to: `/${routes.ADMIN_ROUTE}/${routes.ORDERS_ROUTE}`,
    label: 'Orders',
  },
  {
    to: `/${routes.ADMIN_ROUTE}/${routes.SHOP_PRODUCTS_ROUTE}`,
    label: 'Products',
  },
  {
    to: `/${routes.ADMIN_ROUTE}/${routes.MESSAGES_ROUTE}`,
    label: 'Messages',
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
    to: routes.SHOP_LAPTOPS_ROUTE,
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
