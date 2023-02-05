import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../context/context';
import { IOrderedProduct } from '../types/types';
import { CART_ROUTE, CHECKOUT_ROUTE } from '../utils/consts';
import { getIntTotal, getTax, getTotal } from '../utils/functions';
import List from './List';
import OrderItem from './OrderItem';

interface OrderItemsProps {
  items: IOrderedProduct[];
  showImages?: boolean;
  orderStatus?: string[];
  orderShippingCost?: number | undefined;
}

function OrderItems({
  items,
  showImages,
  orderStatus,
  orderShippingCost,
}: OrderItemsProps) {
  const {
    cart,
  } = useContext(Context);
  const { pathname } = useLocation();
  const shippingMethodName = cart.selectedShippingMethod?.name;
  const shippingMethodPrice = cart.selectedShippingMethod?.price;
  const noShippingMethodSelected = !shippingMethodName && pathname === `/${CART_ROUTE}/${CHECKOUT_ROUTE}`;
  const tax = getTax(getTotal(items));
  const shippingCost = orderShippingCost || shippingMethodPrice;
  let shippingVal: number | string = '';
  if (noShippingMethodSelected) {
    shippingVal = 'Select shipping below';
  } else if (!shippingCost) {
    shippingVal = 'Free';
  } else {
    shippingVal = shippingCost!;
  }
  const total = getIntTotal(items, shippingCost);
  return (
    <List
      className="order-items-ul"
      items={items}
      renderAs={((orderItem) => (
        <li key={orderItem.id}>
          <OrderItem
            legend={orderItem.shopproduct.name}
            value={orderItem.price}
            addons={orderItem.addons}
            image={showImages && orderItem.shopproduct.thumbnail}
            review={orderItem.review}
            orderItem={orderItem}
            orderStatus={orderStatus}
          />
        </li>
      ))}
    >
      <OrderItem
        legend="Tax"
        value={tax}
      />
      <OrderItem
        legend="Shipping"
        className="shipping"
        value={shippingVal}
      />
      <OrderItem
        legend="Total"
        value={total}
        className="total"
      />
    </List>
  );
}

OrderItems.defaultProps = {
  showImages: false,
  orderStatus: undefined,
  orderShippingCost: 0,
};

export default observer(OrderItems);
