import { useState, useEffect } from 'react';
import { getMaxPage } from '../utils/functions';
import useQuery from './useQuery';

interface UsePaginationProps {
  itemsPerPage: number;
  itemsInDb: number;
  concurrentlySetQuery?: boolean;
}

interface UsePaginationReturn {
  page: number;
  pageLimit: number;
  pageLimitReached: boolean;
  changePage: (number: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const usePagination = ({
  itemsPerPage,
  itemsInDb,
  concurrentlySetQuery,
}: UsePaginationProps): UsePaginationReturn => {
  const {
    searchParams,
    setSearchParams,
    searchParamsRecord,
  } = useQuery(concurrentlySetQuery ? { page: '1' } : {});
  const pageFromQuery = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(1);
  const [pageLimitReached, setPageLimitReached] = useState<boolean>(false);
  const changePage = (number: number) => {
    const newPage = number > pageLimit || number < 1 ? pageLimit : number;
    setPage(newPage);
    if (concurrentlySetQuery) {
      setSearchParams({ ...searchParamsRecord, page: number.toString() });
    }
  };
  const nextPage = () => changePage(page + 1);
  const prevPage = () => changePage(page - 1);
  useEffect(() => {
    if (page === pageLimit) {
      setPageLimitReached(true);
    } else {
      setPageLimitReached(false);
    }
  }, [page, pageLimit, pageFromQuery]);
  useEffect(() => {
    const newPageLimit = getMaxPage(itemsInDb, itemsPerPage);
    setPageLimit(newPageLimit);
    if (newPageLimit > 0 && page > newPageLimit) {
      changePage(newPageLimit);
    }
  }, [itemsInDb, itemsPerPage]);
  useEffect(() => { // accounts for back/forward browser buttons
    if (page !== pageFromQuery) {
      setPage(pageFromQuery);
    }
  }, [pageFromQuery]);
  return {
    page,
    pageLimit,
    pageLimitReached,
    changePage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
