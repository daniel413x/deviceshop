import React, { ReactElement } from 'react';
import { IOrderedProduct } from '../types/types';
import List from './List';
import OrderItem from './OrderItem';

interface OrderItemsProps {
  children?: ReactElement | (ReactElement | string | undefined)[] | string | false | undefined;
  items: IOrderedProduct[];
}

function OrderItems({
  children,
  items,
}: OrderItemsProps) {
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
          />
        </li>
      ))}
    >
      {children}
    </List>
  );
}

OrderItems.defaultProps = {
  children: '',
};

export default OrderItems;
