import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoMedium from '../../assets/logos/logo-medium.png';
import logoSmall from '../../assets/logos/logo-small.png';
import {
  navbarButtons,
} from '../../utils/arrays';
import { FRONT_PAGE_ROUTE, SHOP_ROUTE } from '../../utils/consts';
import { ReactComponent as AccountIcon } from '../../assets/icons/account.svg';
import Search from './Search';
import { fetchProducts } from '../../http/shopProductAPI';
import { IShopProduct, QueryReqFetchMultipleShopProducts } from '../../types/types';
import SearchResult from './SearchResult';
import EndItem from './EndItem';
import useBreakpoints from '../../hooks/useBreakpoints';
import Dropdown from '../Dropdown';
import List from '../List';

function Navbar() {
  const { lg } = useBreakpoints();
  const [searchResults, setSearchResults] = useState<IShopProduct[]>([]);
  const searchParams: QueryReqFetchMultipleShopProducts = {
    attributes: ['name', 'id', 'thumbnail'],
    searchbar: {
      value: '', // server controller method for ShopProducts is configured to to search model Specification according to these parameters and match associated ShopProducts
    },
    limit: 5,
  };
  return (
    <nav id="navbar" className="navbar">
      <NavLink
        className="logo"
        to="/"
      >
        <img
          src={!lg ? logoMedium : logoSmall}
          alt="Stonetech logo"
        />
      </NavLink>
      <List
        items={navbarButtons}
        className="center-row"
        renderAs={({ to, label }) => (
          <li key={label}>
            <Dropdown
              to={to}
              label={label}
            />
          </li>
        )}
      />
      <div className="end-row">
        <NavLink className="account-link" to={FRONT_PAGE_ROUTE}>
          <AccountIcon />
          Login
        </NavLink>
        <Search
          searchParams={searchParams}
          searchHandler={fetchProducts}
          results={searchResults}
          setResults={setSearchResults}
          Result={SearchResult}
          endItemsInResults={[{ label: 'Shop more', to: SHOP_ROUTE, className: 'shop-more-link' }]}
          EndItem={EndItem}
        />
      </div>
    </nav>
  );
}

export default Navbar;
