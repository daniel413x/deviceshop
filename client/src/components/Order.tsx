import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Either, IOrder } from '../types/types';
import { dateMonthYear } from '../utils/functions';
import Button from './Button';
import OrderItems from './OrderItems';
import AngleDownIcon from './AngleDownIcon';
import Address from './Address';
import OrderItem from './OrderItem';
import {
  CANCELED, CANCELLATION_REQUESTED, DELIVERED, PROCESSING, RETURN_REQUESTED, SHIPPED,
} from '../utils/consts';

type OrderEitherProps = Either<
{
  setNewStatusOrder: (order: IOrder) => void;
},
{
  setCanceledOrder: (order: IOrder) => void;
  setReturnedOrderId: (id: string) => void;
}>;

type OrderProps = {
  order: IOrder;
} & OrderEitherProps;

function Order({
  order,
  setCanceledOrder,
  setReturnedOrderId,
  setNewStatusOrder,
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
            <span className="key">
              Order placed
            </span>
            <span className="value">
              {orderDate}
            </span>
          </div>
          <div className="status col">
            <span className="key">
              Status
            </span>
            {showTrackingLink ? (
              <NavLink to="#" className="value">
                {statusLabel}
              </NavLink>
            ) : (
              <span className="value">
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
            <span>
              Order
              {' '}
              <span className="id">
                {`${id.slice(0, 11)}...`}
              </span>
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
      <div className={`buttons-row ${orderCanceled && 'blocked'}`}>
        {setNewStatusOrder && ( // admin only
          <Button
            onClick={() => setNewStatusOrder!(order)}
            buttonStyle="secondary"
            className="change-status-button"
          >
            Change status
          </Button>
        )}
        {(setReturnedOrderId && setCanceledOrder) && ( // customer only
          orderDelivered ? (
            <Button
              onClick={() => setReturnedOrderId!(id)}
              buttonStyle="secondary"
            >
              Return order
            </Button>
          ) : (
            <Button
              onClick={() => setCanceledOrder!(order)}
              buttonStyle="secondary"
              className={`cancel-order-button ${orderCancellationRequested && 'blocked'}`}
            >
              Cancel order
            </Button>
          )
        )}
        <Button
          buttonStyle="secondary"
        >
          Contact
        </Button>
      </div>
      <div className="divider" />
    </div>
  );
}

export default Order;
