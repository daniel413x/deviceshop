import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import List from '../../../components/List';
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
import { fetchOrdersAdmin } from '../../../http/orderAPI';
import Order from '../../../components/Order';
import FilterLinks from '../../../components/Admin/FilterLinks';
import ColumnedPage from '../../../components/ColumnedPage';
import AdminSideCol from '../../../components/Admin/AdminSideCol';

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
    loading,
  } = useQueriedItems<IOrder>({
    noFirstRender: true,
    initialSorting: 'byNewest',
    fetchAPI: fetchOrdersAdmin,
    itemsPerPage,
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
    <ColumnedPage
      id="admin-orders"
      className="admin-search-page"
      header="Orders"
      leftSideCol={<AdminSideCol />}
      noDiv
      noEllipses
    >
      <NewStatusModal
        show={newStatusOrder}
        close={() => setNewStatusOrder(undefined)}
        setOrders={setOrders}
        orders={orders}
      />
      <div className="upper-row">
        <Search
          dontRenderResults
          setSearchParams={setSearchParams}
        />
        <FilterLinks>
          <FilterLink
            label={`All (${allOrdersCount})`}
            to={`/${ADMIN_ROUTE}/${ORDERS_ROUTE}`}
          />
          <FilterLink
            label={`Unshipped (${unshippedOrdersCount})`}
            to={`/${ADMIN_ROUTE}/${ORDERS_ROUTE}/${UNSHIPPED}`}
          />
        </FilterLinks>
      </div>
      <List
        className={`search-results-ul ${loading && 'loading'}`}
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
    </ColumnedPage>
  );
}

export default observer(Orders);
