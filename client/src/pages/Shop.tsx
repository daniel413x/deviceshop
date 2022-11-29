import { observer } from 'mobx-react-lite';
import React, {
  useContext, useEffect,
} from 'react';
import { NavLink } from 'react-router-dom';
import BreadcrumbTrail from '../components/BreadcrumbTrail';
import Button from '../components/Button';
import List from '../components/List';
import PageHeader from '../components/PageHeader';
import FilterMenu from '../components/Shop/FilterMenu';
import RemoveFilterButton from '../components/Shop/RemoveFilterButton';
import SortingButtonsRow from '../components/Shop/SortingButtonsRow';
import ShopProductCard from '../components/ShopProductCard';
import SideCol from '../components/SideCol';
import Context from '../context/context';
import usePagination from '../hooks/usePagination';
import { shopFilterButtons } from '../utils/arrays';
import { ReactComponent as AngleIcon } from '../assets/icons/angleup.svg';
import useTrackDimensions from '../hooks/useTrackDimensions';
import LoadingAnimation from '../components/LoadingAnimation';
import useQuery from '../hooks/useQuery';

function Shop() {
  const { shopPage } = useContext(Context);
  const dbProductCount = shopPage.count;
  const itemsPerPage = 15;
  const {
    page,
    pageLimitReached,
    changePage,
  } = usePagination({
    itemsPerPage,
    itemsInDb: dbProductCount,
  });
  const {
    searchParamsRecord,
    thereAreSearchParams,
  } = useQuery();
  const currentCount = shopPage.items.length;
  let renderedProductCount = currentCount;
  if (currentCount >= dbProductCount) {
    renderedProductCount = dbProductCount;
  }
  const { width: mainColWidth } = useTrackDimensions('main-col');
  const gridGap = 20;
  const itemWidth = 265;
  const compositeWidth = itemWidth + gridGap; // each compositeWidth is intended to correspond to the width of a .shop-product-card plus the right side of its grid gap, creating predictable break point matching up with that of the .shop-product-ul's flex container
  const maxWidth = (Math.floor(
    (mainColWidth! + gridGap) / compositeWidth,
  )
    * compositeWidth) - gridGap;
  const listView = shopPage.view === 'list';
  const loadMore = async () => {
    const newPage = page + 1;
    changePage(newPage);
    await shopPage.fetchMoreShopProducts(newPage);
  };
  useEffect(() => {
    changePage(1);
  }, [shopPage.activeFilters]);
  useEffect(() => {
    shopPage.setPage(page);
  }, [page]);
  useEffect(() => {
    if (thereAreSearchParams) {
      shopPage.setFiltersFromSearchParams(searchParamsRecord);
    } else {
      shopPage.resetFilters();
    }
    (async () => {
      await shopPage.fetchAndSetShopProducts();
    })();
  }, []);
  return (
    <div id="shop">
      <SideCol />
      <div className="main-col" id="main-col">
        <BreadcrumbTrail />
        <PageHeader
          header="Shop all products"
        />
        <div
          style={{ maxWidth }}
        >
          <div
            className="product-count-row"
            style={{ maxWidth }}
          >
            <span className="product-count">
              <span className="figure">
                {dbProductCount}
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
          <SortingButtonsRow />
        </div>
        <List
          items={shopPage.items}
          className={`shop-products-ul ${listView && 'list-view'} ${shopPage.loading && 'loading'}`}
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
        {shopPage.loading && (
          <LoadingAnimation />
        )}
        <div
          className="lower-elements"
          style={{ maxWidth }}
        >
          <span className="product-count">
            {renderedProductCount}
            {' '}
            of
            {' '}
            {dbProductCount}
            {' '}
            products
          </span>
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
