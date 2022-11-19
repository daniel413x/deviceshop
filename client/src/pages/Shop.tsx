import { observer } from 'mobx-react-lite';
import React, {
  useContext, useEffect, useRef, useState,
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
import { fetchProducts } from '../http/shopProductAPI';
import { shopFilterButtons } from '../utils/arrays';
import { ReactComponent as AngleIcon } from '../assets/icons/angleup.svg';
import useTrackDimensions from '../hooks/useTrackDimensions';
import LoadingAnimation from '../components/LoadingAnimation';
import useQuery from '../hooks/useQuery';

function Shop() {
  const { shopPage } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  const productCount = shopPage.count;
  const nullFirstRender = useRef(null);
  const itemsPerPage = 15;
  const {
    page,
    pageLimitReached,
    changePage,
  } = usePagination({
    itemsPerPage,
    itemsInDb: productCount,
  });
  const {
    searchParamsRecord,
    thereAreSearchParams,
    searchParams,
  } = useQuery();
  const renderedProductCount = productCount < itemsPerPage ? productCount : itemsPerPage * page;
  const { width: mainColWidth } = useTrackDimensions('main-col');
  const gridGap = 20;
  const itemWidth = 265;
  const compositeWidth = itemWidth + gridGap;
  const maxWidth = (Math.floor(
    (mainColWidth! + gridGap) / compositeWidth,
  )
    * compositeWidth) - gridGap;
  const listView = shopPage.view === 'list';
  const loadMore = async () => {
    const newPage = page + 1;
    changePage(newPage);
    const params = shopPage.createShopProductsQuery(newPage, itemsPerPage);
    const res = await fetchProducts(params);
    shopPage.setItems([...shopPage.items, ...res.rows], res.count);
  };
  useEffect(() => {
    if (thereAreSearchParams) {
      shopPage.setFiltersFromSearchParams(searchParamsRecord);
    } else {
      shopPage.resetFilters();
    }
  }, [searchParams]);
  useEffect(() => {
    (async () => {
      try {
        changePage(1);
        const params = shopPage.createShopProductsQuery(1, itemsPerPage);
        const res = await fetchProducts(params);
        shopPage.setItems(res.rows, res.count);
      } finally {
        setLoading(false);
      }
    })();
  }, [shopPage.activeFilters]);
  useEffect(() => {
    if (nullFirstRender.current) {
      nullFirstRender.current = null;
      return;
    }
    (async () => {
      try {
        const params = shopPage.createShopProductsQuery(page, itemsPerPage);
        params.limit = page * itemsPerPage;
        params.page = 1;
        const res = await fetchProducts(params);
        shopPage.setItems(res.rows, res.count);
      } finally {
        setLoading(false);
      }
    })();
  }, [shopPage.sorting]);
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
              {`${productCount} products`}
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
          className={`shop-products-ul ${listView && 'list-view'}`}
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
          <span className="product-count">
            {renderedProductCount}
            {' '}
            of
            {' '}
            {productCount}
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
