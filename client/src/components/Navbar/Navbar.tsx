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
import NavButtonsAndDropdowns from '../NavButtonsAndDropdowns';
import useBreakpoints from '../../hooks/useBreakpoints';

function Navbar() {
  const { lg } = useBreakpoints();
  const [searchResults, setSearchResults] = useState<IShopProduct[]>([]);
  const searchParams: QueryReqFetchMultipleShopProducts = {
    attributes: ['name', 'id', 'thumbnail'],
    search: {
      attribute: 'name',
      value: '',
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
      <NavButtonsAndDropdowns
        items={navbarButtons}
        className="center-row"
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
