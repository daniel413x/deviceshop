import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import ShopSideCol from '../../../components/ShopSideCol';
import Context from '../../../context/context';
import NavButton from '../../../components/NavButton';
import { ACCOUNT_ROUTE, CHECKOUT_ROUTE, ORDERS_ROUTE } from '../../../utils/consts';
import OrderItems from '../../../components/OrderItems';
import ChatNow from '../../../components/ChatNow';
import { ReactComponent as TrackOrder } from '../../../assets/icons/TrackOrder.svg';
import { ReactComponent as CheckMark } from '../../../assets/icons/CheckMark.svg';
import logoLarge from '../../../assets/logos/logo-large.png';
import { IOrder } from '../../../types/types';
import { fetchOrder } from '../../../http/orderAPI';
import ShippingInfo from '../../../components/OrderConfirmation/ShippingInfo';
import useBreakpoints from '../../../hooks/useBreakpoints';
import ColumnedPage from '../../../components/ColumnedPage';

function OrderConfirmation() {
  const [auth, setAuth] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder>();
  const { width } = useBreakpoints();
  const switchLayout = width <= 1202;
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
  return !auth ? null : (
    <ColumnedPage
      id="order-confirmation"
      leftSideCol={<ShopSideCol />}
      rightSideCol={!switchLayout && (
        <ShippingInfo
          address={order!.orderAddress}
          shippingMethodName={order!.shippingMethod.name}
          email={user.email}
        />
      )}
      sliceLastN={1}
      blockedLinks={[CHECKOUT_ROUTE]}
      header="Thank you"
      noDiv
      noEllipses
    >
      <div>
        <div className="left-col">
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
              orderShippingCost={order.shippingMethod.price}
              showImages
            />
          )}
          {switchLayout && (
            <ShippingInfo
              address={order!.orderAddress}
              shippingMethodName={order!.shippingMethod.name}
              email={user.email}
            />
          )}
          <div className="nav-out-elements">
            <span className="track-your-order">
              Track your order on your
              {' '}
              <NavLink className="account-navlink" to={`/${ACCOUNT_ROUTE}/${ORDERS_ROUTE}`}>
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
      </div>
    </ColumnedPage>
  );
}

export default OrderConfirmation;
