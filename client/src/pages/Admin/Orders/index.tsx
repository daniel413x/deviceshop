import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import List from '../../../components/List';
import PageHeader from '../../../components/PageHeader';
import Search from '../../../components/Search';
import { IOrder } from '../../../types/types';
import {
  ADMIN_ROUTE,
  ORDERS_ROUTE,
  UNSHIPPED,
} from '../../../utils/consts';
import PaginatedItemsCounter from '../../../components/PaginatedItemsCounter';
import PageControl from '../../../components/PageControl';
import useQueriedItems from '../../../hooks/useQueriedItems';
import NewStatusModal from '../../../components/Admin/Orders/NewStatusModal';
import Context from '../../../context/context';
import FilterLink from '../../../components/Admin/ShopProducts/FilterLink';
import AdminSideCol from '../../../components/Admin/AdminSideCol';
import { fetchOrdersAdmin } from '../../../http/orderAPI';
import Order from '../../../components/Order';

function Orders() {
  const itemsPerPage = 10;
  const { adminOrders } = useContext(Context);
  const {
    unshippedOrdersCount,
    allOrdersCount,
  } = adminOrders;
  const setUnshippedOrdersCount = adminOrders.setUnshippedOrdersCount.bind(adminOrders);
  const setAllOrdersCount = adminOrders.setAllOrdersCount.bind(adminOrders);
  const { pathname } = useLocation();
  const unshippedOrdersPage = pathname.includes(UNSHIPPED);
  const [newStatusOrder, setNewStatusOrder] = useState<IOrder>();
  const {
    items: orders,
    fetchPageNumber,
    pageLimitReached,
    pageLimit,
    page,
    dbCount,
    setSearchParams,
    setItems: setOrders,
  } = useQueriedItems<IOrder>({
    initialSorting: 'byNewest',
    fetchAPI: fetchOrdersAdmin,
    itemsPerPage,
    concatItems: true,
    concurrentlySetQuery: true,
    queryProps: unshippedOrdersPage ? {
      unshipped: true,
    } : undefined,
  });
  useEffect(() => {
    (async () => {
      const fetchedUnshippedOrdersCount = await fetchOrdersAdmin({
        unshipped: true,
        countOnly: true,
        distinct: true,
      } as any);
      setUnshippedOrdersCount(fetchedUnshippedOrdersCount.count);
      const fetchedAllOrdersCount = await fetchOrdersAdmin({
        countOnly: true,
        distinct: true,
      } as any);
      setAllOrdersCount(fetchedAllOrdersCount.count);
    })();
  }, []);
  return (
    <div id="admin-orders" className="admin-search-page">
      <NewStatusModal
        show={newStatusOrder}
        close={() => setNewStatusOrder(undefined)}
        setOrders={setOrders}
        orders={orders}
      />
      <div className="columned-page">
        <AdminSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Orders"
            noDiv
            noEllipses
          />
          <div className="upper-row">
            <Search
              dontRenderResults
              setSearchParams={setSearchParams}
            />
            <FilterLink
              label={`All (${allOrdersCount})`}
              to={`/${ADMIN_ROUTE}/${ORDERS_ROUTE}`}
            />
            <FilterLink
              label={`Unshipped (${unshippedOrdersCount})`}
              to={`/${ADMIN_ROUTE}/${ORDERS_ROUTE}/${UNSHIPPED}`}
            />
          </div>
          <List
            className="search-results-ul"
            items={orders}
            childrenBefore
            renderAs={(order) => (
              <li key={order.id}>
                <Order
                  order={order}
                  setNewStatusOrder={setNewStatusOrder}
                />
              </li>
            )}
          />
          <PaginatedItemsCounter
            page={page}
            itemsPerPage={itemsPerPage}
            dbCount={dbCount}
            descriptor="orders"
          />
          <PageControl
            page={page}
            changePage={fetchPageNumber}
            pageLimitReached={pageLimitReached}
            pageLimit={pageLimit}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(Orders);
