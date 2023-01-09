import React, {
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import List from '../../../components/List';
import PageHeader from '../../../components/PageHeader';
import Search from '../../../components/Search';
import ShopSideCol from '../../../components/ShopSideCol';
import { deleteProduct, fetchProducts } from '../../../http/shopProductAPI';
import { IShopProduct } from '../../../types/types';
import { ReactComponent as AddIcon } from '../../../assets/icons/Add.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/Trash.svg';
import { CREATE_ROUTE, EDIT_ROUTE } from '../../../utils/consts';
import { makeSlug } from '../../../utils/functions';
import PaginatedItemsCounter from '../../../components/PaginatedItemsCounter';
import PageControl from '../../../components/PageControl';
import useQueriedItems from '../../../hooks/useQueriedItems';
import IconButton from '../../../components/IconButton';
import IconNavlink from '../../../components/IconNavlink';
import ConfirmationModal from '../../../components/ConfirmationModal';

interface SearchResultProps {
  result: IShopProduct;
  setDeletedId: (id: string) => void;
}

function SearchResult({ result, setDeletedId }: SearchResultProps) {
  const {
    thumbnail,
    id,
    name,
    stock,
    discountedPrice,
    type: {
      name: typeName,
    },
  } = result;
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
              {`Price: ${discountedPrice}`}
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
          onClick={() => setDeletedId(id)}
          Icon={TrashIcon}
          iconStyle="warn"
        />
      </div>
    </div>
  );
}

function ShopProducts() {
  const itemsPerPage = 10;
  const [deletedId, setDeletedId] = useState<string>('');
  const {
    items: products,
    fetchPageNumber,
    pageLimitReached,
    pageLimit,
    page,
    dbCount,
    setSearchParams,
    fetch,
  } = useQueriedItems<IShopProduct>({
    initialSorting: 'byNewest',
    fetchAPI: fetchProducts,
    itemsPerPage,
    concatItems: true,
    concurrentlySetQuery: true,
  });
  const confirmDelete = async () => {
    await deleteProduct(deletedId);
    fetch();
  };
  return (
    <div id="shop-products">
      <ConfirmationModal
        show={deletedId}
        close={() => setDeletedId('')}
        title={`Delete product ${deletedId}`}
        prompt="A deleted product's data cannot be restored."
        callback={() => confirmDelete()}
      />
      <div className="columned-page">
        <ShopSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Products"
            noDiv
            noEllipses
          />
          <Search
            dontRenderResults
            setSearchParams={setSearchParams}
          />
          <List
            className="search-results-ul"
            items={products}
            childrenBefore
            renderAs={(product) => (
              <li key={product.id}>
                <SearchResult
                  result={product}
                  setDeletedId={setDeletedId}
                />
              </li>
            )}
          >
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
                    New device
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

          </List>
          <PaginatedItemsCounter
            page={page}
            itemsPerPage={itemsPerPage}
            dbCount={dbCount}
            descriptor="products"
          />
          <PageControl
            page={page}
            changePage={fetchPageNumber}
            pageLimitReached={pageLimitReached}
            pageLimit={pageLimit}
          />
        </div>
      </div>
    </div>
  );
}

export default ShopProducts;
