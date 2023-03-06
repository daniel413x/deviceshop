import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { IOrderedAddon, IOrderedProduct, IReview } from '../types/types';
import { ReactComponent as FullStar } from '../assets/icons/FullStar.svg';
import { convertIntToPrice, formatPrice } from '../utils/functions';
import List from './List';
import Button from './Button';
import ReviewModal from './ReviewModal';
import { ACCOUNT_ROUTE, ORDERS_ROUTE } from '../utils/consts';
import RefocusedElement from './RefocusedElement';

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
  const renderedPrice = formatPrice(convertIntToPrice(price));
  return (
    <div className="addon row">
      <span className="name">
        {name}
      </span>
      <div className="dots-divider" />
      <span className="price">
        $
        {renderedPrice}
      </span>
    </div>
  );
}

interface OrderItemProps {
  addons?: IOrderedAddon[];
  legend: string;
  value: number | string;
  className?: string;
  image?: string | false;
  review?: IReview;
  orderItem?: IOrderedProduct;
  orderStatus?: string[];
}

function OrderItem({
  addons,
  legend,
  value,
  className,
  image,
  review,
  orderItem,
  orderStatus,
}: OrderItemProps) {
  const { pathname } = useLocation();
  const [showReviewModal, setShowReviewModal] = useState<IOrderedProduct>();
  const showReviewButton = orderItem && pathname === `/${ACCOUNT_ROUTE}/${ORDERS_ROUTE}`;
  // const showReviewButton = !review && orderItem;
  const renderAddons = addons && addons.length > 0;
  let renderedPrice;
  const showAPrice = typeof value === 'number';
  if (showAPrice) {
    renderedPrice = formatPrice(convertIntToPrice(value));
  }
  return (
    <div className={`order-item ${className}`}>
      {orderItem && (
        <ReviewModal
          show={showReviewModal}
          orderedProduct={showReviewModal}
          close={() => setShowReviewModal(undefined)}
          review={review}
          orderStatus={orderStatus}
          productName={orderItem.shopproduct.name}
        />
      )}
      {image && (
        <img
          src={`${process.env.REACT_APP_API_URL}${image}`}
          alt={legend}
          className="thumbnail"
        />
      )}
      <div className="row">
        <span className="name">
          {legend}
        </span>
        <div className="dots-divider" />
        <div className="end">
          {showReviewButton && (
            <RefocusedElement>
              <Button
                className="show-review-modal-button button"
                onClick={() => setShowReviewModal(orderItem)}
              >
                <FullStar />
                {!review ? 'Review' : 'Change'}
              </Button>
            </RefocusedElement>
          )}
          <span className="price">
            {showAPrice ? `$${renderedPrice}` : value}
          </span>
        </div>
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
  image: '',
  review: undefined,
  orderItem: undefined,
  orderStatus: undefined,
};

export default OrderItem;
