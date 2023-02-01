import { useEffect, useRef, useState } from 'react';
import {
  QueryReqFetchMultipleAny, SearchParamsRecord, SequelizeFindAndCountAll,
} from '../types/types';
import usePagination from './usePagination';
import useQuery from './useQuery';

interface UseQueriedItemsProps<T> {
  itemsPerPage: number;
  fetchAPI: (query: QueryReqFetchMultipleAny<T>) => Promise<SequelizeFindAndCountAll<T>>;
  concurrentlySetQuery?: boolean;
  initialSorting?: string;
  queryProps?: QueryReqFetchMultipleAny<T>;
  noFirstRender?: boolean;
  handleSearchParams?: (searchParamsRecord: SearchParamsRecord, query: QueryReqFetchMultipleAny<T>) => QueryReqFetchMultipleAny<T>; // if you need search params like ?type=smartphone&brand=apple handled a certain way
  pageOneOnSearchParamsChange?: boolean;
  concatOnSearchParamsChange?: boolean;
  concatOnFetchPageNumber?: boolean;
}

interface UseQueriedItemsReturn<T> {
  items: T[];
  loading: boolean;
  fetchAndSort: (string: string) => void;
  fetchPageNumber: (page: number) => void;
  changePage: (page: number) => void;
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
  noFirstRender,
  handleSearchParams,
  pageOneOnSearchParamsChange,
  concatOnSearchParamsChange,
  concatOnFetchPageNumber,
}: UseQueriedItemsProps<T>): UseQueriedItemsReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    let query: any = {
      limit: itemsPerPage,
      page,
      order: {
        [sorting]: true,
      },
      distinct: true,
      ...queryProps,
    };
    if (thereAreSearchParams) {
      if (handleSearchParams) {
        query = handleSearchParams(searchParamsRecord, query);
      } else {
        const noMutate = { ...searchParamsRecord };
        const noMutateKeys = Object.keys(noMutate);
        for (let k = 0; k < noMutateKeys.length; k += 1) {
          query[noMutateKeys[k]] = noMutate[noMutateKeys[k]];
        }
      }
    }
    return query;
  };
  const fetchAndSort = async (sortString?: string) => {
    const query = createQuery();
    query.order = { [sortString || sorting]: true };
    query.limit = page * itemsPerPage;
    query.page = 1;
    try {
      setLoading(true);
      const fetchedItems = await fetchAPI(query);
      setItems(fetchedItems.rows);
      setSorting(sortString || sorting);
    } finally {
      setLoading(false);
    }
  };
  const fetch = async (addedParams?: QueryReqFetchMultipleAny<T>) => {
    const query = createQuery();
    try {
      setLoading(true);
      const fetchedItems = await fetchAPI({ ...query, ...addedParams });
      setItems(concatOnSearchParamsChange ? items.concat(fetchedItems.rows) : fetchedItems.rows);
      setDbProductCount(fetchedItems.count);
    } finally {
      setLoading(false);
    }
  };
  const fetchPageNumber = async (pageArg: number) => {
    changePage(pageArg);
    const query = createQuery();
    query.page = pageArg;
    try {
      setLoading(true);
      const fetchedItems = await fetchAPI({ ...query });
      setItems(concatOnFetchPageNumber ? items.concat(fetchedItems.rows) : fetchedItems.rows);
      setDbProductCount(fetchedItems.count);
    } finally {
      setLoading(false);
    }
  };
  const ref = useRef<boolean>(true); // prevent double fetch on render
  useEffect(() => {
    if (noFirstRender && ref.current) {
      ref.current = false;
      return;
    }
    if (pageOneOnSearchParamsChange) {
      changePage(1);
      fetch({ page: 1 });
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
    sorting,
    setSorting,
    page,
    fetchPageNumber,
    pageLimit,
    dbCount,
    setSearchParams,
    fetch,
    changePage,
  };
}

export default useQueriedItems;
