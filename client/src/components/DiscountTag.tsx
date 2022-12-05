import React from 'react';

interface DiscountTagProps {
  discount: number;
}

function DiscountTag({
  discount,
}: DiscountTagProps) {
  return (
    <span className="discount-tag">
      -
      {discount}
      %
    </span>
  );
}

export default DiscountTag;
