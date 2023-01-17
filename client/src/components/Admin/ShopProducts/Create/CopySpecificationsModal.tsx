import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Context from '../../../../context/context';
import { fetchProducts } from '../../../../http/shopProductAPI';
import { IShopProduct, QueryReqFetchMultipleShopProducts } from '../../../../types/types';
import Button from '../../../Button';
import CloseButton from '../../../CloseButton';
import Modal from '../../../Modal';
import Search from '../../../Search';
import Specifications from '../../../Specifications';

interface SearchResultProps {
  result: IShopProduct;
  callback: (arg: any) => void;
  resetState: () => void;
}

function SearchResult({
  result,
  callback,
  resetState,
}: SearchResultProps) {
  const onClick = () => {
    callback(result);
    resetState();
  };
  const {
    name,
  } = result;
  return (
    <div className="results-item">
      <button className="button-overlay" onClick={onClick} aria-label="Press to copy" type="button" />
      <div className="name" title={name}>{name}</div>
    </div>
  );
}

interface CopySpecificationsModalProps {
  show: boolean;
  close: () => void;
}

function CopySpecificationsModal({
  show,
  close,
}: CopySpecificationsModalProps) {
  const {
    createProductPage,
    notifications,
  } = useContext(Context);
  const autoFocusRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<IShopProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IShopProduct>();
  const searchResultClickCallback = (result: IShopProduct) => {
    setSelectedProduct(result);
  };
  const searchParams: QueryReqFetchMultipleShopProducts = {
    attributes: ['name', 'id', 'thumbnail'],
    search: '',
    limit: 5,
  };
  const generate = () => {
    createProductPage.setSpecifications(selectedProduct!.specifications);
    notifications.message(
      'Specifications generated for product form',
    );
    close();
  };
  useEffect(() => {
    if (show) {
      autoFocusRef.current?.focus();
    }
  }, [show]);
  return (
    <Modal
      show={show}
      close={close}
      className="copy-specification-modal"
      id="copy-specification-modal"
      size="medium"
    >
      <div className="window-header">
        <div className="left-col">
          Copy specifications
        </div>
        <CloseButton
          callback={close}
        />
      </div>
      <div className="body">
        <div className="left-col">
          <Search
            searchParams={searchParams}
            fetchHandler={fetchProducts}
            results={searchResults}
            callback={searchResultClickCallback}
            setResults={setSearchResults}
            Result={SearchResult}
            placeholder="Search products"
            ref={autoFocusRef}
          />
        </div>
        <div className="right-col">
          {selectedProduct?.name}
          {selectedProduct && (
          <Specifications
            specifications={selectedProduct.specifications}
          />
          )}
          {selectedProduct && (
          <div className="bottom-buttons">
            <Button
              buttonStyle="warn"
              onMouseDown={generate}
            >
              Generate specifications
            </Button>
          </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CopySpecificationsModal;
