import React, { useEffect, useState } from 'react';
import { dateMonthYear, formatPrice } from '../../utils/functions';
import { ReactComponent as CircleCheck } from '../../assets/icons/CircleCheck.svg';
import RatingBadge from './RatingBadge';
import { IReview } from '../../types/types';
import SortingDropdown from '../SortingDropdown';
import { fetchReviews } from '../../http/reviewAPI';
import RatingStars from '../RatingStars';
import List from '../List';
import Button from '../Button';
import usePagination from '../../hooks/usePagination';

interface ReviewProps {
  review: IReview;
}

function Review({
  review,
}: ReviewProps) {
  const {
    avatar,
    firstName,
    lastName,
  } = review.user;
  const {
    rating,
    id,
    body,
  } = review;
  const {
    name: productName,
  } = review.shopproduct;
  const {
    createdAt,
  } = review.orderedproduct;
  const date = dateMonthYear(createdAt);
  return (
    <div className="review">
      <div className="user">
        <img
          src={`${process.env.REACT_APP_API_URL}${avatar}`}
          alt="User avatar"
          className="avatar"
        />
        <span className="name">
          {`${firstName} ${lastName}`}
        </span>
        <RatingStars
          rating={rating}
          nameForKey={id}
        />
      </div>
      <div className="title-row">
        <h4>
          {productName}
        </h4>
        <span className="purchase-verification">
          <CircleCheck />
          {`Purchased ${date}`}
        </span>
      </div>
      <p className="body">
        {body}
      </p>
      <div className="divider" />
    </div>
  );
}

interface ReviewsProps {
  shopProductId: string;
  rating: number | string;
}

function Reviews({
  shopProductId,
  rating,
}: ReviewsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [sorting, setSorting] = useState<string>('relevance');
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [dbReviewCount, setDbReviewCount] = useState<number>(0);
  const itemsPerPage = 3;
  const {
    page,
    pageLimitReached,
    changePage,
  } = usePagination({
    itemsPerPage,
    itemsInDb: dbReviewCount,
  });
  const createParams = () => ({
    where: {
      shopProductId,
    },
    limit: itemsPerPage,
    order: {
      [sorting]: true,
    },
    page,
  });
  const loadMore = async () => {
    (async () => {
      try {
        setLoading(true);
        const nextPage = page + 1;
        const res = await fetchReviews({
          ...createParams(),
          page: nextPage,
        });
        changePage(nextPage);
        setReviews([...reviews, ...res.rows]);
      } finally {
        setLoading(false);
      }
    })();
  };
  useEffect(() => {
    (async () => {
      try {
        const fetchedReviews = await fetchReviews({
          ...createParams(),
        });
        setReviews(fetchedReviews.rows);
        setDbReviewCount(fetchedReviews.count);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const decimalRating = formatPrice(Number(rating));
  let label = 'Relevance';
  if (sorting === 'relevance') {
    label = 'Relevance';
  }
  if (sorting === 'byLowestRated') {
    label = 'Rating: Low to High';
  }
  if (sorting === 'byHighestRated') {
    label = 'Rating: High to Low';
  }
  const changeOrder = async (string: string) => {
    const fetchedReviews = await fetchReviews({
      ...createParams(),
      limit: page * itemsPerPage,
      order: {
        [string]: true,
      },
    });
    setReviews(fetchedReviews.rows);
    setSorting(string);
  };
  const sortingButtons = [
    {
      label: 'Relevance',
      callback: () => changeOrder('relevance'),
    },
    {
      label: 'Rating: High to Low',
      callback: () => changeOrder('byHighestRated'),
    },
    {
      label: 'Rating: Low to High',
      callback: () => changeOrder('byLowestRated'),
    },
  ];
  const noReviews = reviews.length === 0;
  return (
    <div className={`reviews ${loading && 'loading'} ${noReviews && 'no-reviews'}`}>
      <div className="header-elements">
        <h4 className="section-header">
          Product reviews
        </h4>
        {noReviews && (
          <span className="no-reviews">
            Product has not been reviewed.
          </span>
        )}
        {!noReviews && (
        <RatingBadge
          rating={decimalRating}
          reviewsLength={reviews.length}
        />
        )}
      </div>
      {!noReviews && (
      <SortingDropdown
        sortButtons={sortingButtons}
        label={label}
      />
      )}
      {!noReviews && <div className="divider" />}
      <List
        className="reviews-ul"
        items={reviews}
        renderAs={((review) => (
          <li key={review.id}>
            <Review
              review={review}
            />
          </li>
        ))}
      />
      {!noReviews && (
      <Button
        onClick={loadMore}
        className={`next-page-button ${pageLimitReached && 'blocked'}`}
      >
        Show more
      </Button>
      )}
    </div>
  );
}

export default Reviews;
