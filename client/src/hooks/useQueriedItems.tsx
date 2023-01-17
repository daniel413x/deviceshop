import { useEffect, useRef, useState } from 'react';
import { QueryReqFetchMultipleAny, SearchParamsRecord, SequelizeFindAndCountAll } from '../types/types';
import usePagination from './usePagination';
import useQuery from './useQuery';

interface UseQueriedItemsProps<T> {
  itemsPerPage: number;
  fetchAPI: (query: QueryReqFetchMultipleAny<T>) => Promise<SequelizeFindAndCountAll<T>>;
  concatItems?: boolean;
  concurrentlySetQuery?: boolean;
  initialSorting?: string;
  queryProps?: QueryReqFetchMultipleAny<T>;
}

interface UseQueriedItemsReturn<T> {
  items: T[];
  loading: boolean;
  fetchAndSort: (string: string) => void;
  fetchPageNumber: (page: number) => void;
  pageLimitReached: boolean;
  setSorting: (string: string) => void;
  page: number,
  sorting: string,
  pageLimit: number;
  dbCount: number;
  setItems: (items: any[]) => void;
  setSearchParams: (obj: SearchParamsRecord) => void;
  fetch: () => void;
}

function useQueriedItems<T>({
  itemsPerPage,
  fetchAPI,
  concurrentlySetQuery,
  initialSorting,
  queryProps,
}: UseQueriedItemsProps<T>): UseQueriedItemsReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<string>(initialSorting || '');
  const [dbCount, setDbProductCount] = useState<number>(0);
  const {
    page,
    pageLimitReached,
    changePage,
    pageLimit,
  } = usePagination({
    itemsPerPage,
    itemsInDb: dbCount,
    concurrentlySetQuery,
  });
  const {
    searchParamsRecord,
    setSearchParams,
    thereAreSearchParams,
  } = useQuery();
  const createQuery: () => QueryReqFetchMultipleAny<T> = () => {
    const query: any = {
      limit: itemsPerPage,
      page,
      order: {
        [sorting]: true,
      },
      distinct: true,
      ...queryProps,
    };
    if (thereAreSearchParams) {
      const noMutate = { ...searchParamsRecord };
      const noMutateKeys = Object.keys(noMutate);
      for (let k = 0; k < noMutateKeys.length; k += 1) {
        query[noMutateKeys[k]] = noMutate[noMutateKeys[k]];
      }
    }
    return query;
  };
  const fetchAndSort = async (sortString: string) => {
    const query = createQuery();
    query.order = { [sortString]: true };
    query.limit = page * itemsPerPage;
    query.page = 1;
    try {
      setLoading(true);
      const fetchedItems = await fetchAPI(query);
      setItems(fetchedItems.rows);
      setSorting(sortString);
    } finally {
      setLoading(false);
    }
  };
  const fetchPageNumber = (pageArg: number) => {
    const query = createQuery();
    query.page = pageArg;
    changePage(pageArg);
  };
  const fetch = async () => {
    const query = createQuery();
    try {
      setLoading(true);
      const fetchedItems = await fetchAPI(query);
      setItems(fetchedItems.rows);
      setDbProductCount(fetchedItems.count);
    } finally {
      setLoading(false);
    }
  };
  const ref = useRef<boolean>(true); // prevent double fetch on render
  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    fetch();
  }, [searchParamsRecord]);
  return {
    items,
    setItems,
    loading,
    fetchAndSort,
    pageLimitReached,
    setSorting,
    page,
    fetchPageNumber,
    pageLimit,
    dbCount,
    sorting,
    setSearchParams,
    fetch,
  };
}

export default useQueriedItems;
