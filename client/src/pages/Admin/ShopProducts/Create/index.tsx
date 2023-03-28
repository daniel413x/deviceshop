import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import { useLocation, useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { IShopProduct } from '../../../../types/types';
import TopInfoRow from '../../../../components/Admin/ShopProducts/Create/TopInfoRow';
import Specifications from '../../../../components/Admin/ShopProducts/Create/Specifications';
import CollapsibleInfo from '../../../../components/CollapsibleInfo';
import EditableField from '../../../../components/EditableField';
import Context from '../../../../context/context';
import FormSubmissionOverlay from '../../../../components/Admin/ShopProducts/Create/FormSubmissionOverlay';
import { createProduct, fetchProduct, updateProduct } from '../../../../http/shopProductAPI';
import {
  CREATE_SHOPPRODUCT_ROUTE, EDIT_ROUTE,
} from '../../../../utils/consts';
import ColumnedPage from '../../../../components/ColumnedPage';
import { makeSlug } from '../../../../utils/functions';
import CreationSuccessModal from '../../../../components/Admin/ShopProducts/Create/CreationSuccessModal';

const Description = observer(() => {
  const {
    createProductPage,
  } = useContext(Context);
  return (
    <CollapsibleInfo
      header="Description"
    >
      <EditableField
        outsideInput={createProductPage.description}
        // eslint-disable-next-line react/jsx-no-bind
        setOutsideInput={createProductPage.setDescription.bind(createProductPage)}
        id="descriptionPreview"
      />
    </CollapsibleInfo>
  );
});

function CreateShopProduct() {
  const {
    createProductPage,
    notifications,
  } = useContext(Context);
  const { title } = useParams();
  const [creationSuccess, setCreationSuccess] = useState<boolean>(false);
  const { pathname } = useLocation();
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const put = title || createProductPage.id;
  const {
    loading,
  } = createProductPage;
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    const form = new FormData(e.currentTarget);
    form.append('specifications', JSON.stringify(createProductPage.specifications)); // in PUT requests, specifications not in this array will be deleted
    if (!form.get('typeId') || !form.get('brandId') || createProductPage.missingName() || createProductPage.missingDescription() || createProductPage.missingImages()) {
      notifications.error(
        'Required fields missing',
      );
      return;
    }
    try {
      if (put) {
        const updatedProduct = await updateProduct(createProductPage.id, form);
        createProductPage.setImages(updatedProduct.images);
        notifications.message(
          'Shop product was successfully updated',
        );
        window.history.pushState(null, 'Edit product', makeSlug(updatedProduct.name));
      } else {
        const { newProduct, newProductSpecifications } = await createProduct(form);
        createProductPage.setId(newProduct.id);
        createProductPage.setImages(newProduct.images);
        createProductPage.setSpecifications(newProductSpecifications);
        setCreationSuccess(true);
      }
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    } finally {
      createProductPage.setLoading(false);
    }
  };
  useEffect(() => {
    if (pathname === `/${CREATE_SHOPPRODUCT_ROUTE}` && createProductPage.id) {
      createProductPage.setAllValues(undefined);
    }
    if (put) { // if title, a PUT form
      (async () => {
        try {
          createProductPage.setLoading(true);
          const fetchedProduct = await fetchProduct(title!) as IShopProduct;
          createProductPage.setAllValues(fetchedProduct);
        } finally {
          createProductPage.setLoading(false);
        }
      })();
    } else {
      createProductPage.setAllValues(undefined);
      createProductPage.setLoading(false);
    }
  }, []);
  return (
    <form id="create-shop-product" onSubmit={submit}>
      <CreationSuccessModal
        show={creationSuccess}
        close={() => setCreationSuccess(false)}
      />
      <ColumnedPage
        className={`shop-product-page ${loading && 'loading'}`}
        blockedLinks={[EDIT_ROUTE]}
      >
        <TopInfoRow />
        <div className="collapsible-info-area">
          <Description />
          <CollapsibleInfo
            header="Specifications"
          >
            <Specifications />
          </CollapsibleInfo>
          <CollapsibleInfo
            header="Returns &amp; warranty"
          >
            <div className="returns-and-warranty">
              <div className="thirty-day-return">
                <span className="label">
                  30-day return
                </span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="info warranty">
                <span className="label">
                  Warranty
                </span>
                <span className="value">
                  24 months
                </span>
              </div>
              <div className="divider" />
              <div className="info repairs">
                <span className="label">
                  Repairs
                </span>
                <span className="value">
                  Available for a fee
                </span>
              </div>
            </div>
          </CollapsibleInfo>
        </div>
        <div className="divider wide" />
      </ColumnedPage>
      <FormSubmissionOverlay
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
    </form>
  );
}

export default CreateShopProduct;
