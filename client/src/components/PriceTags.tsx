import React from 'react';
import { convertIntToPrice, formatPrice } from '../utils/functions';

interface PriceTagsProps {
  price: number | string;
  discount?: number | string;
}

function PriceTags({
  price,
  discount,
}: PriceTagsProps) {
  const undiscountedPrice = formatPrice(convertIntToPrice(price));
  const discountedPrice = formatPrice(convertIntToPrice(price, discount));
  return (
    <div className={`price-tags ${discount && 'with-discount'}`}>
      <span className="undiscounted-price">
        $
        {undiscountedPrice}
      </span>
      {discount && (
      <span className="discounted-price">
        $
        {discountedPrice}
      </span>
      )}
    </div>
  );
}

PriceTags.defaultProps = {
  discount: '',
};

export default PriceTags;
