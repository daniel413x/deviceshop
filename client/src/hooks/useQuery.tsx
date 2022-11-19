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
  const search = searchParams.toString();
  const thereAreSearchParams = search.length > 0;
  let searchParamsRecord: any = {};
  if (!thereAreSearchParams) {
    searchParamsRecord = {};
  } else {
    const queryString = searchParams.toString();
    searchParamsRecord = JSON.parse(`{"${
      decodeURI(queryString)
        .replace(/"/g, '\\"')
        .replace(/\+/g, ' ')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .toLowerCase()
    }"}`);
  }
  const removeSearchParams = (params: string | string[]) => {
    if (Array.isArray(params)) {
      params.forEach((string) => {
        delete searchParamsRecord[string];
      });
    } else {
      delete searchParamsRecord[params];
    }
    setSearchParams({ ...searchParamsRecord });
  };
  return {
    searchParamsRecord,
    thereAreSearchParams,
    setSearchParams,
    removeSearchParams,
    searchParams,
  };
};

export default useQuery;
