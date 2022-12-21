import React from 'react';
import BreadcrumbTrail from '../components/BreadcrumbTrail';
import PageHeader from '../components/PageHeader';
import AccountSideCol from '../components/Account/AccountSideCol';
import useBreakpoints from '../hooks/useBreakpoints';
import ChatNow from '../components/ChatNow';
import { fetchOrders } from '../http/orderAPI';
import OrdersControl from '../components/OrdersControl';

function YourOrders() {
  const { width } = useBreakpoints();
  const chatBreakpoint = width >= 1203;
  return (
    <div id="your-orders">
      <div className="columned-page">
        <AccountSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Your orders"
            noDiv
          />
          <OrdersControl
            fetchAPI={fetchOrders}
          />
          {!chatBreakpoint && <ChatNow className="mobile" />}
        </div>
        {chatBreakpoint && (
        <div className="chat-col">
          <ChatNow />
        </div>
        )}
      </div>
    </div>
  );
}

export default YourOrders;
