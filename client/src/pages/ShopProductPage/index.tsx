import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchProduct } from '../../http/shopProductAPI';
import { IOrderedProduct, IShopProduct } from '../../types/types';
import TopInfoRow from '../../components/ShopProductPage/TopInfoRow';
import Specifications from '../../components/Specifications';
import CollapsibleInfo from '../../components/CollapsibleInfo';
import Reviews from '../../components/ShopProductPage/Reviews';
import RecentlyViewedProducts from '../../components/RecentlyViewedProducts';
import { FRONT_PAGE_ROUTE } from '../../utils/consts';
import ReviewModal from '../../components/ReviewModal';
import { eligibileToReview } from '../../http/orderedProductAPI';
import Context from '../../context/context';
import LeaveARating from '../../components/ShopProductPage/LeaveARating';
import ColumnedPage from '../../components/ColumnedPage';

function ShopProductPage() {
  const { notifications, user } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [orderedProduct, setOrderedProduct] = useState<IOrderedProduct>();
  const [product, setProduct] = useState<IShopProduct>();
  const navigate = useNavigate();
  const { title } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const fetchedProduct = await fetchProduct(title as string);
        if (!fetchedProduct) {
          navigate(FRONT_PAGE_ROUTE);
          return;
        }
        setProduct(fetchedProduct);
        const { id } = fetchedProduct;
        if (!localStorage.getItem('recentlyViewedIds')) {
          localStorage.setItem('recentlyViewedIds', JSON.stringify([id]));
        } else {
          const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewedIds')!) as string[];
          if (recentlyViewedIds?.indexOf(id) === -1) {
            recentlyViewedIds.unshift(id);
          }
          localStorage.setItem('recentlyViewedIds', JSON.stringify(recentlyViewedIds.slice(0, 4)));
        }
        if (!user.isGuest) {
          try {
            const fetchedOrderedProduct = await eligibileToReview(fetchedProduct.id);
            setOrderedProduct(fetchedOrderedProduct);
          } catch (error: any) {
            notifications.message(
              `${error.response.data.message}`,
            );
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);
  return (
    <div id="shop-product-page">
      {orderedProduct && (
        <LeaveARating
          setShowReviewModal={setShowReviewModal}
          orderedProduct={orderedProduct}
        />
      )}
      <ColumnedPage
        className={`shop-product-page ${loading && 'loading'}`}
      >
        <ReviewModal
          show={showReviewModal}
          orderedProduct={orderedProduct}
          close={() => setShowReviewModal(false)}
          productName={product?.name || ''}
        />
        {product && (
        <TopInfoRow
          product={product}
        />
        )}
        <div className="collapsible-info-area">
          {product && (
          <CollapsibleInfo
            header="Description"
          >
            <span className="description">
              {product.description}
            </span>
          </CollapsibleInfo>
          )}
          {product && (
          <CollapsibleInfo
            header="Specifications"
          >
            <Specifications
              specifications={product.specifications}
            />
          </CollapsibleInfo>
          )}
          {product && (
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
          )}
        </div>
        <div className="divider wide" />
        {product && (
        <Reviews
          shopProductId={product.id}
          rating={product.rating}
        />
        )}
      </ColumnedPage>
      <RecentlyViewedProducts />
    </div>
  );
}

export default ShopProductPage;
