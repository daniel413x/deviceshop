import React, {
  useContext, useEffect,
} from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import Button from '../../components/Button';
import List from '../../components/List';
import PageHeader from '../../components/PageHeader';
import FilterMenu from '../../components/Shop/FilterMenu';
import RemoveFilterButton from '../../components/Shop/RemoveFilterButton';
import SortingButtonsRow from '../../components/Shop/SortingButtonsRow';
import ShopProductCard from '../../components/ShopProductCard';
import ShopSideCol from '../../components/ShopSideCol';
import Context from '../../context/context';
import { shopFilterButtons } from '../../utils/arrays';
import { ReactComponent as AngleIcon } from '../../assets/icons/angleup.svg';
import useTrackDimensions from '../../hooks/useTrackDimensions';
import LoadingAnimation from '../../components/LoadingAnimation';
import useQuery from '../../hooks/useQuery';
import useBreakpoints from '../../hooks/useBreakpoints';
import PaginatedItemsCounter from '../../components/PaginatedItemsCounter';
import useQueriedItems from '../../hooks/useQueriedItems';
import {
  IShopProduct,
  QueryReqFetchMultiple,
  QueryReqFetchMultipleAny,
  SearchParamsRecord,
} from '../../types/types';
import { fetchProducts } from '../../http/shopProductAPI';
import { getFiltersFromSearchParamsRecord } from '../../utils/functions';

function Shop() {
  const { width: mainColWidth } = useTrackDimensions('main-col');
  const { width } = useBreakpoints();
  const gridGap = 20;
  const itemWidth = 265;
  const compositeWidth = itemWidth + gridGap; // each compositeWidth is intended to correspond to the width of a .shop-product-card plus the right side of its grid gap, creating predictable break point matching up with that of the .shop-product-ul's flex container
  const maxWidth = width! < 767 ? '100%' : (Math.floor(
    (mainColWidth! + gridGap) / compositeWidth,
  )
    * compositeWidth) - gridGap;
  const { shopPage } = useContext(Context);
  const listView = shopPage.view === 'list';
  const {
    searchParamsRecord,
    thereAreSearchParams,
  } = useQuery();
  useEffect(() => {
    if (thereAreSearchParams) {
      shopPage.setFiltersFromSearchParams(searchParamsRecord);
    } else {
      shopPage.resetFilters();
    }
  }, [searchParamsRecord]);
  const itemsPerPage = 15;
  const handleSearchParams = (searchParams: SearchParamsRecord, query: QueryReqFetchMultipleAny<IShopProduct>): QueryReqFetchMultiple<IShopProduct> => {
    const specifications = getFiltersFromSearchParamsRecord(searchParams);
    return {
      ...query,
      filters: {
        specifications,
      },
    };
  };
  const {
    items: products,
    fetchPageNumber,
    pageLimitReached,
    page,
    dbCount,
    sorting,
    fetchAndSort,
    loading,
  } = useQueriedItems<IShopProduct>({
    initialSorting: 'relevance',
    fetchAPI: fetchProducts,
    itemsPerPage,
    noFirstRender: true,
    pageOneOnSearchParamsChange: true,
    concatOnFetchPageNumber: true,
    handleSearchParams,
  });
  const loadMore = async () => {
    const newPage = page + 1;
    fetchPageNumber(newPage);
  };
  return (
    <div id="shop" className="columned-page">
      <ShopSideCol />
      <div className="main-col" id="main-col">
        <BreadcrumbTrail />
        <div
          style={{ maxWidth }}
        >
          <PageHeader
            header="Shop all products"
          />
          <div
            className="product-count-row"
            style={{ maxWidth }}
          >
            <span className="product-count">
              <span className="figure">
                {dbCount}
              </span>
              {' '}
              products
            </span>
            <List
              className="remove-filter-button-ul"
              items={shopPage.activeFilters}
              renderAs={((specification) => (
                <li key={specification.id}>
                  <RemoveFilterButton
                    specification={specification}
                  />
                </li>
              ))}
            />
          </div>
          <List
            items={shopFilterButtons}
            className="filter-buttons-ul"
            renderAs={({ specificationKey, label }) => (
              <li key={specificationKey}>
                <FilterMenu
                  specificationKey={specificationKey}
                  label={label}
                />
              </li>
            )}
          />
          <SortingButtonsRow
            sorting={sorting}
            setSorting={fetchAndSort}
          />
        </div>
        <List
          items={products}
          className={`shop-products-ul ${listView && 'list-view'} ${loading && 'loading'}`}
          renderAs={((product) => (
            <li key={product.id}>
              <ShopProductCard
                product={product}
                expanded
                listView={listView}
              />
            </li>
          ))}
        />
        {loading && (
          <LoadingAnimation />
        )}
        <div
          className="lower-elements"
          style={{ maxWidth }}
        >
          <PaginatedItemsCounter
            page={page}
            itemsPerPage={itemsPerPage}
            dbCount={dbCount}
            descriptor="products"
          />
          <div className="lower-row">
            <Button
              onClick={loadMore}
              className={`next-page-button ${pageLimitReached && 'blocked'}`}
            >
              Show more
            </Button>
            <NavLink
              to="#"
              className="to-top-button"
              title="Return to top"
              onClick={() => window.scrollTo(0, 0)}
            >
              <AngleIcon />
              To top
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Shop);
