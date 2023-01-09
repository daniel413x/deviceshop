import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import ShopSideCol from '../../../../components/ShopSideCol';
import BreadcrumbTrail from '../../../../components/BreadcrumbTrail';
import { IShopProduct } from '../../../../types/types';
import TopInfoRow from '../../../../components/Admin/ShopProducts/Create/TopInfoRow';
import Specifications from '../../../../components/Admin/ShopProducts/Create/Specifications';
import CollapsibleInfo from '../../../../components/CollapsibleInfo';
import EditableField from '../../../../components/EditableField';
import Context from '../../../../context/context';
import FormSubmissionOverlay from '../../../../components/Admin/ShopProducts/Create/FormSubmissionOverlay';
import { fetchProduct } from '../../../../http/shopProductAPI';
import { EDIT_ROUTE } from '../../../../utils/consts';

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
  } = useContext(Context);
  const { title } = useParams();
  useEffect(() => {
    if (title) { // if title, a PUT form is implied
      (async () => {
        try {
          const fetchedProduct = await fetchProduct(title) as IShopProduct;
          createProductPage.setFetchedValues(fetchedProduct);
        } finally {
          createProductPage.setLoading(false);
        }
      })();
    } else {
      createProductPage.setStock(10);
      createProductPage.setPrice('1000.00');
      createProductPage.setDescription('Description');
      createProductPage.setName('Product name');
      createProductPage.setDiscount(10);
    }
  }, []);
  return (
    <div id="create-shop-product" className="shop-product-page">
      <div className="columned-page">
        <ShopSideCol />
        <div className="main-col">
          <BreadcrumbTrail
            blockedLinks={[EDIT_ROUTE]}
          />
          <TopInfoRow />
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
          <div className="divider wide" />
        </div>
      </div>
      <FormSubmissionOverlay />
    </div>
  );
}

export default CreateShopProduct;
