import React from 'react';
import { fetchOrders } from '../../../http/orderAPI';
import OrdersControl from '../../../components/OrdersControl';
import ColumnedPage from '../../../components/ColumnedPage';
import AccountSideCol from '../../../components/Account/AccountSideCol';

function YourOrders() {
  return (
    <ColumnedPage
      id="your-orders"
      header="Your orders"
      leftSideCol={<AccountSideCol />}
      noDiv
    >
      <OrdersControl
        fetchAPI={fetchOrders}
      />
    </ColumnedPage>
  );
}

export default YourOrders;
