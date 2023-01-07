import React from 'react';
import { convertPriceInt, formatPrice } from '../utils/functions';

interface PriceTagsProps {
  price: number | string;
  discount?: number | string;
}

function PriceTags({
  price,
  discount,
}: PriceTagsProps) {
  const undiscountedPrice = formatPrice(convertPriceInt(price));
  const discountedPrice = formatPrice(convertPriceInt(price, discount));
  return (
    <div className={`price-tags ${discount && 'with-discount'}`}>
      {discount && (
      <span className="undiscounted-price">
        $
        {undiscountedPrice}
      </span>
      )}
      <span className="discounted-price">
        $
        {discountedPrice}
      </span>
    </div>
  );
}

PriceTags.defaultProps = {
  discount: '',
};

export default PriceTags;
