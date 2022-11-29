import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import {
  IShopProduct,
  SequelizeFindAndCountAll,
} from '../../types/types';
import ShopProductCard from '../ShopProductCard';
import List from '../List';

interface TrendingItemsProps {
  api: () => Promise<SequelizeFindAndCountAll<IShopProduct>>;
  header: string;
  className?: string;
}

function TrendingItems({
  api,
  header,
  className,
}: TrendingItemsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IShopProduct[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const fetchedProducts = await api();
        setProducts(fetchedProducts.rows);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className={`trending-items ${className} ${loading}`}>
      <SectionHeader
        header={header}
      />
      <List
        className="items"
        items={products}
        renderAs={((product) => (
          <li key={product.name}>
            <ShopProductCard
              product={product}
            />
          </li>
        ))}
      />
    </div>
  );
}

TrendingItems.defaultProps = {
  className: false,
};

export default TrendingItems;
