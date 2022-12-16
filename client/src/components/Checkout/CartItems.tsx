import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Context from '../../context/context';
import { IOrderedProduct } from '../../types/types';
import OrderItem from '../OrderItem';
import OrderItems from '../OrderItems';

function CartItems() {
  const {
    cart,
  } = useContext(Context);
  const total = cart.getIntTotal();
  const tax = total * 0.05;
  return (
    <OrderItems
      items={cart.items as IOrderedProduct[]}
    >
      <li key="shipping-cost">
        <OrderItem
          legend="Shipping"
          value={cart.shippingMethod ? cart.shippingMethod.price : 'Select shipping below'}
        />
      </li>
      <li key="tax">
        <OrderItem
          legend="Tax"
          value={tax}
        />
      </li>
      <li key="total">
        <OrderItem
          legend="Total"
          value={total}
          className="total"
        />
      </li>
    </OrderItems>
  );
}

export default observer(CartItems);
