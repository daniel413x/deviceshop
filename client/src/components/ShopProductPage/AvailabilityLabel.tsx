import React from 'react';
import { ReactComponent as CircleCheck } from '../../assets/icons/CircleCheck.svg';
import { ReactComponent as CircleWarning } from '../../assets/icons/CircleWarning.svg';

interface AvailabilityLabelProps {
  stock: number;
}

function AvailabilityLabel({
  stock,
}: AvailabilityLabelProps) {
  return (
    <div className="availability-label">
      {!stock && <CircleWarning className="icon" />}
      {stock && <CircleCheck className="icon" />}
      <span className="rating">
        {!stock && 'out of stock'}
        {stock && `${stock} in stock`}
      </span>
    </div>
  );
}

export default AvailabilityLabel;
