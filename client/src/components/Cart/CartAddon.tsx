import React from 'react';
import { IOrderedAddon } from '../../types/types';
import { convertPriceInt, formatPrice } from '../../utils/functions';

interface CartAddonProps {
  orderedAddon: IOrderedAddon;
}

function CartAddon({
  orderedAddon,
}: CartAddonProps) {
  const {
    price,
    addon: {
      name,
    },
  } = orderedAddon;
  const intToPrice = formatPrice(convertPriceInt(price));
  return (
    <div className="addon">
      <div className="info-row">
        <span className="name">
          {name}
        </span>
        <span className="price">
          $
          {intToPrice}
        </span>
      </div>
      <div className="divider" />
    </div>
  );
}

export default CartAddon;
