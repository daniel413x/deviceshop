import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  RefObject,
  forwardRef,
} from 'react';
import useKeyPress from '../hooks/useKeyPress';
import useOnOutsideClick from '../hooks/useOnOutsideClick';
import List from './List';
import {
  Either,
  IShopProduct,
  QueryReqFetchMultiple,
  SearchParamsRecord,
  SequelizeFindAndCountAll,
} from '../types/types';
import { ReactComponent as MagnifyingGlass } from '../assets/icons/MagnifyingGlass.svg';
import LoadingAnimation from './LoadingAnimation';
import useQuery from '../hooks/useQuery';

type EitherRenderProps<T> = Either<{
  dontRenderResults: boolean; // not rendering results via this component assumes outside rendering with help of an outside hook/component/setSearchParams, etc.
}, {
  Result: any;
  results: any[];
  setResults: (arr: any[]) => void;
  searchParams: QueryReqFetchMultiple<T>;
  fetchHandler: (params: QueryReqFetchMultiple<T>) => Promise<SequelizeFindAndCountAll<IShopProduct>>;
}>;

type SearchProps<T> = {
  callback?: (arg: any) => void;
  className?: string;
  placeholder?: string;
  endItemsInResults?: any[];
  EndItem?: any;
  setSearchParams?: (obj: SearchParamsRecord) => void;
} & EitherRenderProps<T>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Search = forwardRef(<T, A>({
  className,
  placeholder,
  fetchHandler,
  results,
  callback,
  setResults,
  Result,
  endItemsInResults,
  EndItem,
  searchParams,
  dontRenderResults,
  setSearchParams,
}: SearchProps<T>, ref: any) => {
  const [highlight, setHighlight] = useState<number>(0);
  const [idle, setIdle] = useState<boolean>(true);
  const [focused, setFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hideResults, setHideResults] = useState<boolean>(false);
  const [boxShadow, setBoxShadow] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>();
  const {
    searchParamsRecord,
  } = useQuery();
  const upPress = useKeyPress('ArrowUp');
  const downPress = useKeyPress('ArrowDown');
  const enterPress = useKeyPress('Enter');
  const outsideClickRef = useRef<HTMLInputElement>(null);
  useOnOutsideClick(outsideClickRef, () => {
    setHideResults(true);
  });
  const highlightLimit = !results ? 0 : results.length + (endItemsInResults?.length || 0) - 1;
  const noResults = !results ? 0 : results.length === 0;
  const noResultsAfterSearch = !idle && input && !loading && noResults;
  const showResults = !results ? false : !idle && (input || loading || results.length > 0) && !hideResults;
  const showLoading = noResults && loading;
  const onFocus = () => {
    setFocused(true);
    if (!input) {
      setBoxShadow(true);
    }
  };
  const onBlur = () => {
    setBoxShadow(false);
    setFocused(false);
  };
  const onClick = () => {
    setHighlight(0);
    if (input) {
      setHideResults(false);
    }
  };
  const search = async (terms: string) => {
    try {
      setLoading(true);
      const params = { ...searchParams };
      params.searchbar! = terms;
      const res = await fetchHandler!(params);
      setResults!(res.rows);
    } finally {
      setLoading(false);
    }
  };
  const changeInput = (e: ChangeEvent<HTMLInputElement> | null) => {
    const { value } = e!.target;
    if (setResults && value === '') {
      setResults([]);
      setInput('');
      return;
    }
    setInput(value);
  };
  const resetState = () => {
    setInput('');
    setHideResults(true);
    setResults!([]);
  };
  const noFirstRenderRef = useRef<boolean>(true); // prevents overwriting address bar search terms on first render
  useEffect(() => {
    if (noFirstRenderRef.current) {
      noFirstRenderRef.current = false;
      return;
    }
    if (input === '' && focused) {
      setHighlight(0);
      setHideResults(false);
      setBoxShadow(true);
    } else {
      setBoxShadow(false);
    }
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      if (setSearchParams) {
        setSearchParams({ ...searchParamsRecord, searchbar: input });
      }
      if (input === '') {
        setIdle(true);
        return;
      }
      setIdle(false);
      if (fetchHandler) {
        search(input);
      }
    }, 250);
    setSearchTimeout(timeout);
  }, [input]);
  useEffect(() => {
    setHighlight(0);
  }, [hideResults]);
  useEffect(() => {
    if (!focused || !input || noResults) {
      return;
    }
    if (highlight === 0 && upPress) {
      setHighlight(highlightLimit);
      return;
    }
    if (upPress) {
      setHighlight(highlight - 1);
    }
  }, [upPress]);
  useEffect(() => {
    if (!focused || !input || noResults) {
      return;
    }
    if (highlight === highlightLimit + 1) {
      setHighlight(0);
      return;
    }
    if (downPress) {
      setHighlight(highlight + 1);
    }
  }, [downPress]);
  useEffect(() => {
    if (!focused || !input) {
      return;
    }
    if (results?.length && enterPress) {
      setHideResults(true);
      if (callback) {
        callback(results[highlight]);
      }
    }
  }, [enterPress]);
  return (
    <div
      className={`searchbox ${className}`}
      ref={outsideClickRef}
    >
      <div className="input-icon-wrapper">
        <input
          className={`${boxShadow && 'box-shadow'}`}
          type="text"
          value={input}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          onChange={(e) => {
            changeInput(e);
            setHideResults(false);
          }}
          placeholder={placeholder}
          ref={ref}
        />
        <MagnifyingGlass
          className="magnifying-glass"
        />
      </div>
      {!dontRenderResults && (
      <div id="results-container" className={`results-container ${showResults && 'show'}`}>
        <div className="divider" />
        {showLoading && (
          <LoadingAnimation
            className="results-item pseudo"
          />
        )}
        {noResultsAfterSearch && (
        <div className="results-item pseudo">
          <span>No results</span>
        </div>
        )}
        {results && (
          <List
            items={results}
            renderAs={((result, index) => (
              <li className={index === highlight ? 'highlight' : undefined} key={result.id}>
                <Result
                  result={result}
                  callback={callback}
                  resetState={resetState}
                />
              </li>
            ))}
            endItems={noResults ? [] : endItemsInResults}
            renderEndItemsAs={(endItem, index) => (
              <li className={index! + results.length === highlight ? 'highlight' : undefined} key={index! + results.length}>
                <EndItem
                  endItem={endItem}
                />
              </li>
            )}
          />
        )}
      </div>
      )}
    </div>
  );
});

Search.defaultProps = {
  className: '',
  placeholder: '',
  endItemsInResults: undefined,
  EndItem: false,
  callback: undefined,
  setSearchParams: undefined,
};

export default Search as <T>(props: SearchProps<T> & { ref?: RefObject<HTMLInputElement> }) => JSX.Element;
