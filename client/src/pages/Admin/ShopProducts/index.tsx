import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import List from '../../../components/List';
import Search from '../../../components/Search';
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../../../http/shopProductAPI';
import { IShopProduct } from '../../../types/types';
import { ReactComponent as AddIcon } from '../../../assets/icons/Add.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/Trash.svg';
import {
  ADMIN_ROUTE,
  CREATE_ROUTE,
  DELETED,
  DELETED_ROUTE,
  EDIT_ROUTE,
  SHOP_PRODUCTS_ROUTE,
} from '../../../utils/consts';
import { convertIntToPrice, formatPrice, makeSlug } from '../../../utils/functions';
import PaginatedItemsCounter from '../../../components/PaginatedItemsCounter';
import PageControl from '../../../components/PageControl';
import useQueriedItems from '../../../hooks/useQueriedItems';
import IconButton from '../../../components/IconButton';
import IconNavlink from '../../../components/IconNavlink';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Context from '../../../context/context';
import FilterLink from '../../../components/Admin/ShopProducts/FilterLink';
import FilterLinks from '../../../components/Admin/FilterLinks';
import ColumnedPage from '../../../components/ColumnedPage';
import AdminSideCol from '../../../components/Admin/AdminSideCol';

interface SearchResultProps {
  product: IShopProduct;
  setDeletedProduct: (product: IShopProduct) => void;
}

function SearchResult({ product, setDeletedProduct }: SearchResultProps) {
  const {
    thumbnail,
    name,
    stock,
    discountedPrice,
    type: {
      name: typeName,
    },
  } = product;
  const formattedPrice = formatPrice(convertIntToPrice(discountedPrice));
  return (
    <div className="search-result">
      <NavLink
        className="info-col"
        to={`${EDIT_ROUTE}/${makeSlug(name)}`}
      >
        <div className="img-col">
          <img
            src={`${process.env.REACT_APP_API_URL}${thumbnail}`}
            alt="Search result thumbnail"
          />
        </div>
        <div className="text-col">
          <span className="name">
            {name}
          </span>
          <div className="lower-row">
            <span>
              {`Type: ${typeName}`}
            </span>
            &#183;
            <span>
              {`Quantity: ${stock}`}
            </span>
            &#183;
            <span>
              {`Price: $${formattedPrice}`}
            </span>
          </div>
        </div>
      </NavLink>
      <div className="icons-col">
        <IconNavlink
          to={`${EDIT_ROUTE}/${makeSlug(name)}`}
          Icon={EditIcon}
          className="edit-icon"
        />
        <IconButton
          className="trash-icon"
          onClick={() => setDeletedProduct(product)}
          Icon={TrashIcon}
          iconStyle="warn"
        />
      </div>
    </div>
  );
}

function ShopProducts() {
  const itemsPerPage = 10;
  const { adminShopProducts } = useContext(Context);
  const {
    publicProductsCount, deletedProductsCount,
  } = adminShopProducts;
  const setDeletedProductsCount = adminShopProducts.setDeletedProductsCount.bind(adminShopProducts);
  const setPublicProductsCount = adminShopProducts.setPublicProductsCount.bind(adminShopProducts);
  const [deletedProduct, setDeletedProduct] = useState<IShopProduct>();
  const { pathname } = useLocation();
  const deletedProductsPage = pathname.includes(DELETED_ROUTE);
  const {
    items: products,
    changePage,
    pageLimitReached,
    pageLimit,
    page,
    dbCount,
    setSearchParams,
    fetch,
    loading,
  } = useQueriedItems<IShopProduct>({
    noFirstRender: true,
    initialSorting: 'byNewest',
    fetchAPI: fetchProducts,
    itemsPerPage,
    concurrentlySetQuery: true,
    queryProps: deletedProductsPage ? {
      deleted: true,
    } : undefined,
  });
  const deleteAction = async () => {
    if (deletedProductsPage) {
      await deleteProduct(deletedProduct!.id);
      setDeletedProductsCount(deletedProductsCount - 1);
    } else {
      await updateProduct(deletedProduct!.id, {
        flags: [...deletedProduct!.flags, DELETED],
      });
      setPublicProductsCount(publicProductsCount - 1);
      setDeletedProductsCount(deletedProductsCount + 1);
    }
    fetch();
  };
  useEffect(() => {
    (async () => {
      const fetchedPublicProductsCount = await fetchProducts({
        countOnly: true,
      } as any);
      setPublicProductsCount(fetchedPublicProductsCount.count);
      const fetchedDeletedProductsCount = await fetchProducts({
        countOnly: true,
        deleted: true,
      } as any);
      setDeletedProductsCount(fetchedDeletedProductsCount.count);
    })();
  }, []);
  return (
    <ColumnedPage
      header="Shop products"
      id="shop-products"
      className="admin-search-page"
      leftSideCol={<AdminSideCol />}
      noDiv
      noEllipses
    >
      <ConfirmationModal
        show={deletedProduct}
        close={() => setDeletedProduct(undefined)}
        title={`${deletedProductsPage ? 'Permanantly d' : 'D'}elete product ${deletedProduct?.id.slice(0, 8)}(…)?`}
        prompt={`${deletedProductsPage ? 'A product\'s data cannot be restored after it has been deleted from the recycling bin.' : 'Product will be moved to the recycling bin.'}`}
        callback={() => deleteAction()}
      />
      <div className="upper-row">
        <Search
          dontRenderResults
          setSearchParams={setSearchParams}
        />
        <FilterLinks>
          <FilterLink
            label={`Public (${publicProductsCount})`}
            to={`/${ADMIN_ROUTE}/${SHOP_PRODUCTS_ROUTE}`}
          />
          <FilterLink
            label={`Deleted (${deletedProductsCount})`}
            to={`/${ADMIN_ROUTE}/${SHOP_PRODUCTS_ROUTE}/${DELETED_ROUTE}`}
          />
        </FilterLinks>
      </div>
      <List
        className={`search-results-ul ${loading && 'loading'}`}
        items={products}
        childrenBefore
        renderAs={(product) => (
          <li key={product.id}>
            <SearchResult
              product={product}
              setDeletedProduct={setDeletedProduct}
            />
          </li>
        )}
        fillerElement={<div className="search-result filler" />}
        fillersNeeded={itemsPerPage - products.length - 1}
      >
        {!deletedProductsPage && (
        <li key="create-link">
          <NavLink
            to={CREATE_ROUTE}
            className="search-result create-product-link"
          >
            <div className="info-col">
              <div className="img-col">
                <AddIcon />
              </div>
              <div className="text-col">
                New product
              </div>
            </div>
            <div className="icons-col blocked">
              <IconButton
                onClick={() => null}
                Icon={EditIcon}
                className="edit-icon"
              />
              <IconButton
                className="trash-icon"
                onClick={() => null}
                Icon={TrashIcon}
                iconStyle="warn"
              />
            </div>
          </NavLink>
        </li>
        )}
        {!products.length && (
        <li key="no-results">
          <div
            className="search-result no-results"
          >
            No results
          </div>
        </li>
        )}
      </List>
      <PaginatedItemsCounter
        page={page}
        itemsPerPage={itemsPerPage}
        dbCount={dbCount}
        descriptor="products"
      />
      <PageControl
        page={page}
        changePage={changePage}
        pageLimitReached={pageLimitReached}
        pageLimit={pageLimit}
      />
    </ColumnedPage>
  );
}

export default observer(ShopProducts);
