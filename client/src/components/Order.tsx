import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IOrder } from '../types/types';
import { dateMonthYear } from '../utils/functions';
import Button from './Button';
import OrderItems from './OrderItems';
import AngleDownIcon from './AngleDownIcon';
import Address from './Address';
import OrderItem from './OrderItem';
import {
  CANCELED, CANCELLATION_REQUESTED, DELIVERED, PROCESSING, RETURN_REQUESTED, SHIPPED,
} from '../utils/consts';

interface OrderProps {
  order: IOrder;
  setCanceledOrder: (order: IOrder) => void;
  setReturnedOrderId: (id: string) => void;
  adminButtons?: boolean;
}

function Order({
  order,
  setCanceledOrder,
  setReturnedOrderId,
  adminButtons,
}: OrderProps) {
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const {
    createdAt,
    orderAddress,
    id,
    orderItems,
    total,
    status,
  } = order;
  const orderDate = dateMonthYear(createdAt.toString());
  const orderDelivered = status.indexOf(DELIVERED) >= 0;
  const orderCanceled = status.indexOf(CANCELED) >= 0;
  const orderCancellationRequested = status.indexOf(CANCELLATION_REQUESTED) >= 0;
  const returnRequested = status.indexOf(RETURN_REQUESTED) >= 0;
  const orderShipped = status.indexOf(SHIPPED) >= 0;
  const orderProcessing = status.length === 1 && status[0] === PROCESSING;
  const showTrackingLink = !orderProcessing && !orderCanceled;
  let statusLabel;
  if (returnRequested) {
    statusLabel = RETURN_REQUESTED;
  } else if (orderCancellationRequested) {
    statusLabel = CANCELLATION_REQUESTED;
  } else if (orderDelivered) {
    statusLabel = DELIVERED;
  } else if (orderCanceled) {
    statusLabel = CANCELED;
  } else if (orderShipped) {
    statusLabel = SHIPPED;
  } else {
    statusLabel = PROCESSING;
  }
  return (
    <div className="order">
      <div className="header-bar">
        <div className="start-items">
          <div className="col">
            <span>
              Order placed
            </span>
            <span>
              {orderDate}
            </span>
          </div>
          <div className="col">
            <span>
              Status
            </span>
            {showTrackingLink ? (
              <NavLink to="#">
                {statusLabel}
              </NavLink>
            ) : (
              <span>
                {statusLabel}
              </span>
            )}
          </div>
          <div className="col address">
            <span>
              Shipping address
            </span>
            <span>
              <button type="button" onClick={() => setShowAddress(!showAddress)}>
                {`${orderAddress.firstName} ${orderAddress.lastName}`}
                <AngleDownIcon
                  inverse={!showAddress}
                />
              </button>
            </span>
            {showAddress && <Address address={orderAddress} />}
          </div>
        </div>
        <div className="end-items">
          <div className="col">
            <span className="id">
              Order
              {' '}
              {`${id.slice(0, 11)}...`}
            </span>
            <NavLink to={id}>
              View confirmation
            </NavLink>
          </div>
        </div>
      </div>
      <OrderItems
        items={orderItems}
      >
        <OrderItem
          legend="Total"
          value={total}
          className="total"
        />
      </OrderItems>
      {adminButtons ? (
        <div className={`buttons-row ${orderCanceled && 'blocked'}`} />
      ) : (
        <div className={`buttons-row ${orderCanceled && 'blocked'}`}>
          <Button>
            Contact
          </Button>
          {orderDelivered ? (
            <Button
              onClick={() => setReturnedOrderId(id)}
            >
              Return order
            </Button>
          ) : (
            <Button
              onClick={() => setCanceledOrder(order)}
              className={`${orderCancellationRequested && 'blocked'}`}
            >
              Cancel order
            </Button>
          )}
        </div>
      )}
      <div className="divider" />
    </div>
  );
}

Order.defaultProps = {
  adminButtons: false,
};

export default Order;
