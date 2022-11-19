import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useKeyPress from '../../hooks/useKeyPress';
import useOnOutsideClick from '../../hooks/useOnOutsideClick';
import { SHOP_ROUTE } from '../../utils/consts';
import List from '../List';
import { IShopProduct, QueryReqFetchMultiple, SequelizeFindAndCountAll } from '../../types/types';
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/MagnifyingGlass.svg';
import LoadingAnimation from '../LoadingAnimation';

interface SearchProps<T> {
  className?: string;
  searchHandler: (params: QueryReqFetchMultiple<T>) => Promise<SequelizeFindAndCountAll<IShopProduct>>;
  searchParams: QueryReqFetchMultiple<T>;
  results: any[];
  setResults: (arr: any[]) => void;
  Result: any;
  endItemsInResults?: any[];
  EndItem?: any;
  dontRenderResults?: false;
}

function Search<T>({
  className,
  searchHandler,
  results,
  setResults,
  Result,
  endItemsInResults,
  EndItem,
  searchParams,
  dontRenderResults,
}: SearchProps<T>) {
  const [highlight, setHighlight] = useState<number>(0);
  const [idle, setIdle] = useState<boolean>(true);
  const [focused, setFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hideResults, setHideResults] = useState<boolean>(false);
  const [boxShadow, setBoxShadow] = useState<boolean>(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>();
  const navigate = useNavigate();
  const upPress = useKeyPress('ArrowUp');
  const downPress = useKeyPress('ArrowDown');
  const enterPress = useKeyPress('Enter');
  const inputRef = useRef<HTMLInputElement>(null);
  useOnOutsideClick(inputRef, () => {
    setHideResults(true);
  });
  const highlightLimit = results.length + (endItemsInResults?.length || 0) - 1;
  const noResults = results.length === 0;
  const noResultsAfterSearch = !idle && input && !loading && noResults;
  const showResults = !idle && (input || loading || results.length > 0) && !hideResults;
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
      params.searchbar!.value = terms;
      const res = await searchHandler(params);
      setResults(res.rows);
    } finally {
      setLoading(false);
    }
  };
  const changeInput = (e: ChangeEvent<HTMLInputElement> | null) => {
    const { value } = e!.target;
    if (value === '') {
      setResults([]);
      setInput('');
      return;
    }
    setInput(value);
  };
  useEffect(() => {
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
      if (input === '') {
        setIdle(true);
        return;
      }
      setIdle(false);
      search(input);
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
    if (results.length && enterPress) {
      setHideResults(true);
      navigate(`${SHOP_ROUTE}/${results[highlight].id}`); // this also needs to be a prop
    }
  }, [enterPress]);
  return (
    <div className={`searchbox ${className}`}>
      <div className="input-icon-wrapper">
        <input
          ref={inputRef}
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
          placeholder="Search shop"
        />
        <MagnifyingGlass
          className="magnifying-glass"
        />
      </div>
      {!dontRenderResults && (
      <div id="results-container" className={`results-container ${showResults && 'show'}`}>
        <button
          className="button-overlay"
          type="button"
          onClick={() => {
            setResults([]);
            setHideResults(true);
            setInput('');
          }}
        >
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
          <List
            items={results}
            renderAs={((result, index) => (
              <li className={index === highlight ? 'highlight' : undefined} key={result.id}>
                <Result
                  result={result}
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
        </button>
      </div>
      )}
    </div>
  );
}

Search.defaultProps = {
  className: false,
  endItemsInResults: false,
  EndItem: false,
  dontRenderResults: false,
};

export default Search;
