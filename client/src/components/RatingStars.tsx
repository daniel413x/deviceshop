import React from 'react';
import { ReactComponent as FullStar } from '../assets/icons/FullStar.svg';
import { ReactComponent as HalfStar } from '../assets/icons/HalfStar.svg';
import { ReactComponent as EmptyStar } from '../assets/icons/EmptyStar.svg';
import { ReactComponent as GrayStar } from '../assets/icons/GrayStar.svg';

interface RatingStarsProps {
  rating: number;
  nameForKey: string;
}

function RatingStars({
  rating,
  nameForKey,
}: RatingStarsProps) {
  const numberRating = Number(rating);
  const stars: JSX.Element[] = [];
  const ceiling = Math.ceil(numberRating);
  const floor = Math.floor(numberRating);
  const difference = ceiling - numberRating;
  for (let n = 0; n < floor; n += 1) {
    stars.push(<FullStar className="full-star" key={`${nameForKey}${stars.length}`} />);
  }
  if (stars.length === 0) {
    for (let i = 0; i < 5; i += 1) {
      stars.push(<GrayStar className="gray-star" key={`${nameForKey}${stars.length}`} />);
    }
  }
  if (stars.length < 5) {
    if (difference === 0) {
      stars.push(<EmptyStar className="empty-star" key={`${nameForKey}${stars.length}`} />);
    } else if (difference >= 0.5) {
      stars.push(<FullStar className="full-star" key={`${nameForKey}${stars.length}`} />);
    } else {
      stars.push(<HalfStar className="half-star" key={`${nameForKey}${stars.length}`} />);
    }
    const starsNeeded = 5 - stars.length;
    for (let n = 0; n < starsNeeded; n += 1) {
      stars.push(<EmptyStar key={`${nameForKey}${stars.length}`} />);
    }
  }
  return (
    <div className="rating-stars">
      {stars.map((star) => star)}
    </div>
  );
}

export default RatingStars;
