export const FRONT_PAGE_ROUTE = '/';
export const INDEX_ROUTE = '/*';
export const ADMIN_ROUTE = 'admin';
export const COMPANY_ROUTE = 'company';
export const ACCOUNT_ROUTE = 'account';
export const SHOP_PRODUCTS_ROUTE = 'shopproducts';
export const CREDENTIALS_ROUTE = 'credentials';
export const ADDRESSES_ROUTE = 'addresses';
export const ORDERS_ROUTE = 'orders';
export const COMPANY_WILDCARD_ROUTE = 'company/*';
export const ABOUT_ROUTE = 'about';
export const CART_ROUTE = 'cart';
export const CHECKOUT_ROUTE = 'checkout';
export const CONFIRMATION_ROUTE = 'confirmation';
export const ADVANTAGES_ROUTE = 'advantages';
export const PARTNERS_ROUTE = 'partners';
export const FEEDBACK_ROUTE = 'feedback';
export const LOGIN_ROUTE = 'login';
export const LOGOUT_ROUTE = 'logout';
export const REGISTER_ROUTE = 'register';
export const CONTACT_ROUTE = 'contact';
export const SERVICES_ROUTE = 'services';
export const BLOG_ROUTE = 'blog';
export const ENGINEERING_ROUTE = 'engineering';
export const DELIVERY_ROUTE = 'delivery';
export const REPAIRS_ROUTE = 'repairs';
export const MESSAGES_ROUTE = 'messages';
export const SMARTPHONE = 'smartphone';
export const LAPTOP = 'laptop';
export const ACCESSORY = 'accessory';
export const TABLET = 'tablet';
export const REFRIGERATOR = 'refrigerator';
export const DESKTOP = 'desktop';
export const SAMSUNG = 'samsung';
export const CREATE_ROUTE = 'create';
export const CREATE_SHOPPRODUCT_ROUTE = `${ADMIN_ROUTE}/${SHOP_PRODUCTS_ROUTE}/${CREATE_ROUTE}`;
export const EDIT_ROUTE = 'edit';
export const DELETED_ROUTE = 'deleted';
export const APPLE = 'apple';
export const GOOGLE = 'google';
export const BRAND = 'brand';
export const TYPE = 'type';
export const SEARCH_PARAM_TYPE = `?${TYPE}=`;
export const SEARCH_PARAM_BRAND = '?manufacturer=';
export const SHOP_WILDCARD_ROUTE = 'shop/*';
export const SHOP_ROUTE = 'shop';
export const SIDE_COL_SHOP_ROUTE = '/shop';
export const SIDE_COL_SHOP_TYPE_ROUTE = `/shop${SEARCH_PARAM_TYPE}`;
export const SIDE_COL_SHOP_BRAND_ROUTE = `/shop${SEARCH_PARAM_BRAND}`;
export const SHOP_PHONES_ROUTE = `${SIDE_COL_SHOP_ROUTE}${SEARCH_PARAM_TYPE}${SMARTPHONE}`;
export const SHOP_LAPTOPS_ROUTE = `${SIDE_COL_SHOP_ROUTE}${SEARCH_PARAM_TYPE}${LAPTOP}`;
export const SHOP_ACCESSORIES_ROUTE = `${SIDE_COL_SHOP_ROUTE}${SEARCH_PARAM_TYPE}${ACCESSORY}`;
export const SHOP_TABLETS_ROUTE = `${SIDE_COL_SHOP_ROUTE}${SEARCH_PARAM_TYPE}${TABLET}`;
export const SHOP_APPLE_ROUTE = `${SIDE_COL_SHOP_ROUTE}${SEARCH_PARAM_BRAND}${APPLE}`;
export const SHOP_GOOGLE_ROUTE = `${SIDE_COL_SHOP_ROUTE}${SEARCH_PARAM_BRAND}${GOOGLE}`;
export const DEMO_ROUTE = 'demo';
export const GUEST = 'GUEST';
export const ADMIN = 'ADMIN';
export const USER = 'USER';
export const MEMORY = 'Memory';
export const CAMERAS = 'Cameras';
export const BATTERY = 'Battery';
export const CAPACITY = 'Capacity';
export const OPERATING_SYSTEM = 'Operating system';
export const DISPLAY_SIZE = 'Display size (in)';
export const RESOLUTION = 'Resolution';
export const ASPECT_RATIO = 'Aspect ratio';
export const STANDARD = 'Standard';
export const MANUFACTURER = 'Manufacturer';
export const PROCESSING = 'Processing';
export const SHIPPED = 'Shipped';
export const UNSHIPPED = 'unshipped';
export const CANCELLATION_REQUESTED = 'Cancellation requested';
export const RETURN_REQUESTED = 'Return requested';
export const CANCELED = 'Canceled';
export const DELIVERED = 'Delivered';
export const GENERAL_INFORMATION = 'General information';
export const KEY_SPECIFICATIONS = 'Key specifications';
export const DELETED = 'Deleted';
export const FRONT = 'Front';
export const REAR = 'Rear';
export const green = 'green';
export const gray = 'green';
export const red = 'red';
export const shortNotification = 4000;
export const longNotification = 6000;
