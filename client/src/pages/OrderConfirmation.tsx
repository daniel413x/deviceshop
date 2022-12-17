import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import SideCol from '../components/SideCol';
import BreadcrumbTrail from '../components/BreadcrumbTrail';
import PageHeader from '../components/PageHeader';
import Context from '../context/context';
import NavButton from '../components/NavButton';
import { ACCOUNT_ROUTE, ORDERS_ROUTE } from '../utils/consts';
import OrderItems from '../components/OrderItems';
import ChatNow from '../components/ChatNow';
import { ReactComponent as TrackOrder } from '../assets/icons/TrackOrder.svg';
import { ReactComponent as CheckMark } from '../assets/icons/CheckMark.svg';
import logoLarge from '../assets/logos/logo-large.png';
import OrderItem from '../components/OrderItem';
import { IOrder } from '../types/types';
import { fetchOrder } from '../http/orderAPI';
import ShippingInfo from '../components/OrderConfirmation/ShippingInfo';
import useBreakpoints from '../hooks/useBreakpoints';

function OrderConfirmation() {
  const [auth, setAuth] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder>();
  const { width } = useBreakpoints();
  const navigate = useNavigate();
  const {
    notifications,
    user,
  } = useContext(Context);
  const { id } = useParams();
  useEffect(() => {
    try {
      (async () => {
        const fetchedOrder = await fetchOrder(id!);
        if (!fetchedOrder) {
          navigate('/');
        } else {
          setOrder(fetchedOrder);
          setAuth(true);
        }
      })();
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    }
  }, []);
  return (
    <div id="order-confirmation">
      {auth && (
      <div className="columned-page">
        <SideCol />
        <div className="main-col">
          <div className="left-col">
            <BreadcrumbTrail
              sliceLastN={1}
            />
            <PageHeader
              header="Thank you"
              noDiv
              noEllipses
            />
            <span className="order-placed-successfully">
              Your order was placed successfully
              <CheckMark
                className="checkmark"
              />
            </span>
            <img
              src={logoLarge}
              alt="Stonetech logo"
              className="logo"
            />
            <span className="order-id">
              Order
              {' '}
              <span className="id">
                {order && order.id}
              </span>
            </span>
            {order && (
            <OrderItems
              items={order.orderItems}
              showImages
            >
              <OrderItem
                legend="Total"
                value={order.total}
                className="total"
              />
            </OrderItems>
            )}
            {order && width <= 1200 && (
            <ShippingInfo
              address={order.orderAddress}
              shippingMethodName={order.shippingMethod.name}
              email={user.email}
            />
            )}
            <div className="nav-out-elements">
              <span className="track-your-order">
                Track your order on your
                {' '}
                <NavLink className="account-navlink" to={`/${ACCOUNT_ROUTE}`}>
                  account page
                </NavLink>
              </span>
              <NavLink to={`/${ACCOUNT_ROUTE}`}>
                <TrackOrder />
              </NavLink>
              <div className="nav-buttons-col">
                <NavButton className="track-link" to={`/${ACCOUNT_ROUTE}/${ORDERS_ROUTE}`} buttonStyle="match-button">
                  Your orders
                </NavButton>
                <NavButton to="/" buttonStyle="match-button">
                  Front page
                </NavButton>
                <ChatNow />
              </div>
            </div>
          </div>
          {order && width > 1200 && (
          <ShippingInfo
            address={order.orderAddress}
            shippingMethodName={order.shippingMethod.name}
            email={user.email}
          />
          )}
        </div>
      </div>
      )}
    </div>
  );
}

export default OrderConfirmation;
