import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import { IReview } from '../../types/types';
import { fetchRecentReviews } from '../../http/reviewAPI';
import {
  makeSlug,
} from '../../utils/functions';
import {
  SHOP_ROUTE,
} from '../../utils/consts';
import List from '../List';
import RatingStars from '../RatingStars';
import ShownInView from '../ShownInView';

interface RecentReviewProps {
  review: IReview;
  i: number;
}

function Review({
  review,
  i,
}: RecentReviewProps) {
  const {
    body,
    rating,
  } = review;
  const { name: productName } = review.shopproduct;
  const {
    username,
    firstName,
    lastName,
    avatar,
  } = review.user;
  let displayedName = username;
  if (firstName && lastName /* && showFullName */) {
    displayedName = `${firstName} ${lastName}`;
  }
  const slug = makeSlug(productName);
  return (
    <div className={`review ${i % 2 === 0 ? 'even' : 'odd'}`}>
      <RatingStars
        nameForKey={`${productName}_review`}
        rating={rating}
      />
      <div className="avatar-row">
        <img
          src={`${process.env.REACT_APP_API_URL}${avatar}`}
          alt="Product recently reviewed"
          className="avatar"
        />
        <span className="name">
          {displayedName}
        </span>
      </div>
      <NavLink
        to={`${SHOP_ROUTE}/${slug}`}
        className="product-name"
      >
        {productName}
      </NavLink>
      <p className="specifications">
        {body}
      </p>
    </div>
  );
}

function RecentlyReviewed() {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const fetch = async () => {
    try {
      const fetchedReviews = await fetchRecentReviews();
      setReviews(fetchedReviews.rows);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ShownInView
      className={`recently-reviewed ${loading}`}
      func={fetch}
      timeout={500}
    >
      <div className="header-col">
        <SectionHeader
          header="Recently reviewed"
        />
        <p>
          What are customers saying about their purchases?
        </p>
      </div>
      <List
        className="reviews-ul"
        items={reviews}
        renderAs={((review, i) => (
          <li key={review.id}>
            <Review
              review={review}
              i={i!}
            />
          </li>
        ))}
      />
    </ShownInView>
  );
}

export default RecentlyReviewed;
