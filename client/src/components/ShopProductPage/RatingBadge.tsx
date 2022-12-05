import React from 'react';
import { formatPrice } from '../../utils/functions';
import { ReactComponent as FullStar } from '../../assets/icons/FullStar.svg';

interface RatingBadgeProps {
  rating: number | string;
  reviewsLength: number;
}

function RatingBadge({
  rating,
  reviewsLength,
}: RatingBadgeProps) {
  const decimalRating = formatPrice(Number(rating));
  const noReviews = reviewsLength === 0;
  let fadeMultiplier = '';
  if (Number(rating) < 4.5) {
    fadeMultiplier = 'one';
  }
  if (Number(rating) < 4) {
    fadeMultiplier = 'two';
  }
  if (Number(rating) < 3.5) {
    fadeMultiplier = 'three';
  }
  if (Number(rating) < 3) {
    fadeMultiplier = 'four';
  }
  if (Number(rating) < 2.5) {
    fadeMultiplier = 'five';
  }
  if (Number(rating) === 0 && noReviews) {
    fadeMultiplier = 'gray';
  }
  return (
    <div className="rating-badge">
      <div className={`faded ${fadeMultiplier} star-wrapper`}>
        <FullStar
          className="star"
        />
        <span className="rating">
          {decimalRating}
        </span>
      </div>
      <div className="count-col">
        <span>
          /
          5.00
        </span>
        <span>
          {`${reviewsLength} ratings`}
        </span>
      </div>
    </div>
  );
}

export default RatingBadge;
