import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../http/shopProductAPI';
import { IShopProduct } from '../types/types';
import List from './List';
import ShopProductCard from './ShopProductCard';

function RecentlyViewedProducts() {
  const [products, setProducts] = useState<IShopProduct[]>([]);
  const recentlyViewedIds = localStorage.getItem('recentlyViewedIds');
  useEffect(() => {
    if (!recentlyViewedIds) {
      return;
    }
    (async () => {
      if (recentlyViewedIds) {
        const fetchedProducts = await fetchProducts({
          where: {
            id: JSON.parse(recentlyViewedIds) as any,
          },
        });
        setProducts(fetchedProducts.rows.slice().sort((a, b) => {
          const aIndex = recentlyViewedIds.indexOf(a.id);
          const bIndex = recentlyViewedIds.indexOf(b.id);
          if (bIndex > aIndex) {
            return -1;
          }
          return 1;
        }));
      }
    })();
  }, [recentlyViewedIds]);
  return products && (
    <div className="recently-viewed-products">
      <div className="divider" />
      <h4 className="header">
        Recently viewed products
      </h4>
      <List
        className="products-ul"
        items={products!}
        renderAs={(product) => (
          <li key={product.id}>
            <ShopProductCard
              product={product}
              expanded
            />
          </li>
        )}
      />
    </div>
  );
}

export default RecentlyViewedProducts;
