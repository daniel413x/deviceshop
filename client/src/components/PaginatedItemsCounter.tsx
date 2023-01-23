import React from 'react';

interface PaginatedItemsCounterProps {
  page: number;
  itemsPerPage: number;
  dbCount: number;
  descriptor: string;
}

function PaginatedItemsCounter({
  page,
  itemsPerPage,
  dbCount,
  descriptor,
}: PaginatedItemsCounterProps) {
  const currentPageCount = itemsPerPage * page;
  return (
    <span className="paginated-items-counter">
      {currentPageCount > dbCount ? dbCount : currentPageCount}
      {' '}
      of
      {' '}
      <span className="db-count">
        {dbCount}
      </span>
      {' '}
      {descriptor}
    </span>
  );
}

export default PaginatedItemsCounter;
