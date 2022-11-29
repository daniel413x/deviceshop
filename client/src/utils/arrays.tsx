/* eslint-disable no-multiple-empty-lines */
import FrontPage from '../pages/FrontPage';
import Shop from '../pages/Shop';
import * as routes from './consts';

export const indexPublicRoutes = [
  // {
  //   path: routes.ACCOUNT_WILDCARD_ROUTE,
  //   Component: Account,
  // },
  {
    path: routes.SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: routes.INDEX_ROUTE,
    Component: FrontPage,
  },
];

// export const accountRoutes = [
//   {
//     path: routes.ORDERS_ROUTE,
//     Component: Orders,
//   },
//   {
//     path: routes.INDEX_ROUTE,
//     Component: Account,
//   },
// ];

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
