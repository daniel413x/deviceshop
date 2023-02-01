import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import {
  IShopProduct,
  SequelizeFindAndCountAll,
} from '../../types/types';
import ShopProductCard from '../ShopProductCard';
import List from '../List';
import ShownInView from '../ShownInView';

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
  const fetch = async () => {
    try {
      const fetchedProducts = await api();
      setProducts(fetchedProducts.rows);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ShownInView className={`trending-items ${className} ${loading}`} func={fetch} id="trending-items">
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
    </ShownInView>
  );
}

TrendingItems.defaultProps = {
  className: false,
};

export default TrendingItems;
