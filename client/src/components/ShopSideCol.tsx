import React, { useEffect, useState } from 'react';
import { fetchBrands } from '../http/brandAPI';
import { fetchTypes } from '../http/typeAPI';
import { IBrand, IType } from '../types/types';
import { SIDE_COL_SHOP_BRAND_ROUTE, SIDE_COL_SHOP_TYPE_ROUTE } from '../utils/consts';
import { toPlural } from '../utils/functions';
import Dropdown from './Dropdown';
import List from './List';

function ShopSideCol() {
  const [loadingTypes, setLoadingTypes] = useState<boolean>(true);
  const [loadingBrands, setLoadingBrands] = useState<boolean>(true);
  const [types, setTypes] = useState<IType[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { rows: fetchedTypes } = await fetchTypes();
        setTypes(fetchedTypes);
      } finally {
        setLoadingTypes(false);
      }
    })();
    (async () => {
      try {
        const { rows: fetchedBrands } = await fetchBrands();
        setBrands(fetchedBrands);
      } finally {
        setLoadingBrands(false);
      }
    })();
  }, []);
  return (
    <div className={`side-col ${(loadingBrands || loadingTypes) && 'loading'}`}>
      <div className="labeled-col">
        <span className="label">
          Department
        </span>
        {!loadingTypes && (
          <List
            items={types}
            renderAs={({ name, id }) => (
              <li key={id}>
                <div className="divider" />
                <Dropdown
                  to={`${SIDE_COL_SHOP_TYPE_ROUTE}${name.toLowerCase()}`}
                  label={toPlural(name)}
                />
              </li>
            )}
          />
        )}
      </div>
      <div className="labeled-col">
        <span className="label">
          Brand
        </span>
        {!loadingBrands && (
        <List
          items={brands}
          renderAs={({ name, id }) => (
            <li key={id}>
              <div className="divider" />
              <Dropdown
                to={`${SIDE_COL_SHOP_BRAND_ROUTE}${name.toLowerCase()}`}
                label={name}
              />
            </li>
          )}
        />
        )}
      </div>
    </div>
  );
}

export default ShopSideCol;
