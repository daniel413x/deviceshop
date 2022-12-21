import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParamsRecord } from '../types/types';

interface UsePaginationReturn {
  searchParamsRecord: SearchParamsRecord;
  thereAreSearchParams: boolean;
  searchParams: URLSearchParams;
  setSearchParams: (obj: SearchParamsRecord) => void;
  removeSearchParams: (params: string | string[]) => void;
}

const useQuery = (): UsePaginationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const createNewSearchParamsRecord = () => {
    const queryString = searchParams.toString();
    const newSearchParamsRecord = JSON.parse(`{"${
      decodeURI(queryString)
        .replace(/"/g, '\\"')
        .replace(/\+/g, ' ')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .toLowerCase()
    }"}`);
    return newSearchParamsRecord;
  };
  const [searchParamsRecord, setSearchParamsRecord] = useState<any>({});
  const search = searchParams.toString();
  const thereAreSearchParams = search.length > 0;
  const removeSearchParams = (params: string | string[]) => {
    const nextSearchParamsRecord = { ...searchParamsRecord };
    if (Array.isArray(params)) {
      params.forEach((string) => {
        delete nextSearchParamsRecord[string];
      });
    } else {
      delete nextSearchParamsRecord[params];
    }
    setSearchParams({ ...nextSearchParamsRecord });
  };
  useEffect(() => {
    if (!thereAreSearchParams) {
      setSearchParamsRecord({});
    } else {
      const newSearchParamsRecord = createNewSearchParamsRecord();
      setSearchParamsRecord(newSearchParamsRecord);
    }
  }, [searchParams]);
  return {
    searchParamsRecord,
    thereAreSearchParams,
    setSearchParams,
    removeSearchParams,
    searchParams,
  };
};

export default useQuery;
