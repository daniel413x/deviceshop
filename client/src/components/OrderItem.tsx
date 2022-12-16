import React from 'react';
import { IOrderedAddon } from '../types/types';
import { convertPriceInt, formatPrice } from '../utils/functions';
import List from './List';

interface AddonProps {
  addon: IOrderedAddon;
}

function Addon({ addon }: AddonProps) {
  const {
    price,
    addon: {
      name,
    },
  } = addon;
  const renderedPrice = formatPrice(convertPriceInt(price));
  return (
    <li className="addon" key={addon.id}>
      <div className="row">
        <span className="name">
          {name}
        </span>
        <div className="dots-divider" />
        <span className="price">
          $
          {renderedPrice}
        </span>
      </div>
    </li>
  );
}

interface OrderItemProps {
  addons?: IOrderedAddon[];
  legend: string;
  value: number | string;
  className?: string;
}

function OrderItem({
  addons,
  legend,
  value,
  className,
}: OrderItemProps) {
  const renderAddons = addons && addons.length > 0;
  let renderedPrice;
  const showAPrice = typeof value === 'number';
  if (showAPrice) {
    renderedPrice = formatPrice(convertPriceInt(value));
  }
  return (
    <div className={`order-item ${className}`}>
      <div className="row">
        <span className="name">
          {legend}
        </span>
        <div className="dots-divider" />
        <span className="price">
          {showAPrice ? `$${renderedPrice}` : value}
        </span>
      </div>
      {renderAddons && (
      <List
        className="addons-ul"
        items={addons!}
        renderAs={((addon) => (
          <li key={addon.id}>
            <Addon
              addon={addon}
            />
          </li>
        ))}
      />
      )}
      <div className="divider" />
    </div>
  );
}

OrderItem.defaultProps = {
  className: '',
  addons: false,
};

export default OrderItem;
