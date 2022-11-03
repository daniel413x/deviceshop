import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ReactElement,
} from 'react';
import { useNavigate } from 'react-router-dom';
import useKeyPress from '../../hooks/useKeyPress';
import useOnOutsideClick from '../../hooks/useOnOutsideClick';
import { SHOP_ROUTE } from '../../utils/consts';
import List from '../List';
import { IShopProduct, QueryReqFetchMultiple, SequelizeFindAndCountAll } from '../../types/types';
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/MagnifyingGlass.svg';

interface HighlightableLiProps {
  index: number;
  highlight: number;
  liKey: string | number;
  children: ReactElement | (ReactElement | string)[] | string;
}

function HighlightableLi({
  index,
  highlight,
  liKey,
  children,
}: HighlightableLiProps) {
  return (
    <li className={index === highlight ? 'highlight' : undefined} key={liKey}>
      {children}
    </li>
  );
}

interface SearchbarProps<T> {
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

function Searchbar<T>({
  className,
  searchHandler,
  results,
  setResults,
  Result,
  endItemsInResults,
  EndItem,
  searchParams,
  dontRenderResults,
}: SearchbarProps<T>) {
  const [highlight, setHighlight] = useState<number>(0);
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
  const noResultsAfterSearch = input && !loading && noResults;
  const showResults = (input || loading || results.length > 0) && !hideResults;
  const showLoading = noResults && loading;
  const search = async (terms: string) => {
    try {
      setLoading(true);
      const params = { ...searchParams };
      params.search!.value = terms;
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
    if (loading) {
      return;
    }
    if (results.length === 0) {
      search(value);
    }
  };
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
        return;
      }
      search(input);
    }, 500);
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
          <div className="results-item loading-icon">
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          )}
          {noResultsAfterSearch && (
          <div className="results-item pseudo">
            <div className="d-flex align-items-center m-auto">
              <span>No results</span>
            </div>
          </div>
          )}
          <List
            items={results}
            renderAs={((result, index) => (
              <HighlightableLi
                highlight={highlight}
                index={index!}
                liKey={result.id}
              >
                <Result
                  result={result}
                />
              </HighlightableLi>
            ))}
            endItems={noResults ? [] : endItemsInResults}
            renderEndItemsAs={(endItem, index) => (
              <HighlightableLi
                highlight={highlight}
                index={index! + results.length}
                liKey={index! + results.length}
              >
                <EndItem
                  endItem={endItem}
                />
              </HighlightableLi>
            )}
          />
        </button>
      </div>
      )}
    </div>
  );
}

Searchbar.defaultProps = {
  className: false,
  endItemsInResults: false,
  EndItem: false,
  dontRenderResults: false,
};

export default Searchbar;
