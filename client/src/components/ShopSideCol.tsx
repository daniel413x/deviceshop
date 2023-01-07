import React, { useContext } from 'react';
import Context from '../context/context';
import { SIDE_COL_SHOP_BRAND_ROUTE, SIDE_COL_SHOP_TYPE_ROUTE } from '../utils/consts';
import { toPlural } from '../utils/functions';
import Dropdown from './Dropdown';
import List from './List';

function ShopSideCol() {
  const {
    types,
    brands,
  } = useContext(Context);
  return (
    <div className="side-col">
      <div className="labeled-col">
        <span className="label">
          Department
        </span>
        <List
          items={types.all}
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
      </div>
      <div className="labeled-col">
        <span className="label">
          Brand
        </span>
        <List
          items={brands.all}
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
      </div>
    </div>
  );
}

export default ShopSideCol;
