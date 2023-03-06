import React, {
  useState,
} from 'react';
import useQueriedItems from '../hooks/useQueriedItems';
import { IOrder, QueryReqFetchMultipleOrders, SequelizeFindAndCountAll } from '../types/types';
import RequestCancellationModal from './Account/YourOrders/RequestCancellationModal';
import ReturnOrderModal from './Account/YourOrders/ReturnOrderModal';
import List from './List';
import Order from './Order';
import PageControl from './PageControl';
import PaginatedItemsCounter from './PaginatedItemsCounter';
import SortingDropdown from './SortingDropdown';

interface OrdersControlProps {
  fetchAPI: (query: QueryReqFetchMultipleOrders) => Promise<SequelizeFindAndCountAll<any>>;
}

function OrdersControl({
  fetchAPI,
}: OrdersControlProps) {
  const [canceledOrder, setCanceledOrder] = useState<IOrder>();
  const [returnedOrderId, setReturnedOrderId] = useState<string | undefined>();
  const itemsPerPage = 2;
  const {
    items: orders,
    setItems: setOrders,
    loading,
    fetchPageNumber,
    pageLimitReached,
    pageLimit,
    setSorting,
    page,
    dbCount,
    sorting,
  } = useQueriedItems<IOrder>({
    noFirstRender: true,
    initialSorting: 'byNewest',
    fetchAPI,
    itemsPerPage,
    concurrentlySetQuery: true,
  });
  const noOrders = !loading && orders.length === 0;
  let sortingDropdownLabel = '';
  if (sorting === 'relevance') {
    sortingDropdownLabel = 'Relevance';
  }
  if (sorting === 'byLowestPrice') {
    sortingDropdownLabel = 'Price: Low to High';
  }
  if (sorting === 'byHighestRated') {
    sortingDropdownLabel = 'Highest Rated';
  }
  const sortingButtons = [
    {
      label: 'Most recent',
      callback: () => setSorting('mostRecent'),
    },
  ];
  return (
    <div className="orders-control">
      <ReturnOrderModal
        returnedOrderId={returnedOrderId}
        close={() => setReturnedOrderId(undefined)}
      />
      <RequestCancellationModal
        canceledOrder={canceledOrder}
        orders={orders}
        setOrders={setOrders}
        close={() => setCanceledOrder(undefined)}
      />
      <div
        className="sorting-buttons-row"
      >
        <SortingDropdown
          sortButtons={sortingButtons}
          label={sortingDropdownLabel}
        />
      </div>
      <div className="divider" />
      {noOrders && (
        <span className="no-orders">
          No orders on record
        </span>
      )}
      <List
        className="orders-ul"
        items={orders}
        renderAs={((order) => (
          <li key={order.id}>
            <Order
              order={order}
              setCanceledOrder={setCanceledOrder}
              setReturnedOrderId={setReturnedOrderId}
            />
          </li>
        ))}
      />
      {!noOrders && (
        <PaginatedItemsCounter
          page={page}
          itemsPerPage={itemsPerPage}
          dbCount={dbCount}
          descriptor="orders"
        />
      )}
      {!noOrders && (
        <PageControl
          page={page}
          changePage={fetchPageNumber}
          pageLimitReached={pageLimitReached}
          pageLimit={pageLimit}
        />
      )}
    </div>
  );
}

export default OrdersControl;
