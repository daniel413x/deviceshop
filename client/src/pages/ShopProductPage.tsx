import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ShopSideCol from '../components/ShopSideCol';
import BreadcrumbTrail from '../components/BreadcrumbTrail';
import { fetchProduct } from '../http/shopProductAPI';
import { IShopProduct } from '../types/types';
import TopInfoRow from '../components/ShopProductPage/TopInfoRow';
import Specifications from '../components/ShopProductPage/Specifications';
import CollapsibleInfo from '../components/ShopProductPage/CollapsibleInfo';
import Reviews from '../components/ShopProductPage/Reviews';
import RecentlyViewedProducts from '../components/RecentlyViewedProducts';

function ShopProductPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<IShopProduct>();
  const { title } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const fetchedProduct = await fetchProduct(title as string);
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
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div id="shop-product-page" className={`${loading && 'loading'}`}>
      <div className="columned-page">
        <ShopSideCol />
        <div className="main-col">
          <BreadcrumbTrail
            lastString={product?.name}
          />
          {product && (
          <TopInfoRow
            product={product}
          />
          )}
          {product && (
          <CollapsibleInfo
            header="Description"
          >
            {product.description}
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
          <div className="divider wide" />
        </div>
      </div>
      {product && (
        <Reviews
          shopProductId={product.id}
          rating={product.rating}
        />
      )}
      <RecentlyViewedProducts />
    </div>
  );
}

export default ShopProductPage;
