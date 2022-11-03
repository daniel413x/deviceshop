import React, { useContext } from 'react';
import TrendingItems from './TrendingItems';
import { fetchProducts } from '../../http/shopProductAPI';
import Context from '../../context/context';
import { IShopProduct, SequelizeFindAndCountAll } from '../../types/types';

function Trending() {
  const { types } = useContext(Context);
  const smartphones = types.findType('Smartphone');
  let smartphonesFetch: (() => Promise<SequelizeFindAndCountAll<IShopProduct>>) | null = null;
  if (smartphones) {
    smartphonesFetch = () => fetchProducts({
      limit: 3,
      byMostSold: true,
      where: {
        typeId: smartphones.id,
      },
    });
  }
  const laptops = types.findType('Laptop');
  let laptopsFetch: (() => Promise<SequelizeFindAndCountAll<IShopProduct>>) | null = null;
  if (laptops) {
    laptopsFetch = () => fetchProducts({
      limit: 3,
      byMostSold: true,
      where: {
        typeId: laptops.id,
      },
    });
  }
  const tablets = types.findType('Tablet');
  let tabletsFetch: (() => Promise<SequelizeFindAndCountAll<IShopProduct>>) | null = null;
  if (tablets) {
    tabletsFetch = () => fetchProducts({
      limit: 3,
      byMostSold: true,
      where: {
        typeId: tablets.id,
      },
    });
  }
  const accessories = types.findType('Accessory');
  let accessoriesFetch: (() => Promise<SequelizeFindAndCountAll<IShopProduct>>) | null = null;
  if (accessories) {
    accessoriesFetch = () => fetchProducts({
      limit: 3,
      byMostSold: true,
      where: {
        typeId: accessories.id,
      },
    });
  }
  const mostSoldFetch = () => fetchProducts({
    limit: 5,
    byMostSold: true,
  });
  return (
    <div className="trending">
      <TrendingItems
        header="Trending now"
        className="top-row"
        api={mostSoldFetch}
      />
      <div className="columns">
        {smartphonesFetch && (
        <TrendingItems
          header="Trending smartphones"
          api={smartphonesFetch}
        />
        )}
        {laptopsFetch && (
        <TrendingItems
          header="Trending laptops"
          api={laptopsFetch}
        />
        )}
        {tabletsFetch && (
        <TrendingItems
          header="Trending tablets"
          api={tabletsFetch}
        />
        )}
        {accessoriesFetch && (
        <TrendingItems
          header="Trending accessories"
          api={accessoriesFetch}
        />
        )}
      </div>
    </div>
  );
}

export default Trending;
