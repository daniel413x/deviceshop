import React from 'react';
import { Children, IOrderedProduct } from '../types/types';
import List from './List';
import OrderItem from './OrderItem';

interface OrderItemsProps {
  children?: Children;
  items: IOrderedProduct[];
  showImages?: boolean;
}

function OrderItems({
  children,
  items,
  showImages,
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
            image={showImages && orderItem.shopproduct.thumbnail}
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
  showImages: false,
};

export default OrderItems;
