import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import logoMedium from '../../assets/logos/logo-medium.png';
import logoSmall from '../../assets/logos/logo-small.png';
import {
  navbarAccountButtons,
  navbarButtons,
} from '../../utils/arrays';
import {
  ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE,
} from '../../utils/consts';
import { ReactComponent as AccountIcon } from '../../assets/icons/account.svg';
import Search from '../Search';
import { fetchProducts } from '../../http/shopProductAPI';
import { IShopProduct, QueryReqFetchMultipleShopProducts } from '../../types/types';
import SearchResult from './SearchResult';
import EndItem from './EndItem';
import useBreakpoints from '../../hooks/useBreakpoints';
import Dropdown from '../Dropdown';
import List from '../List';
import Context from '../../context/context';
import NavButton from '../NavButton';
import { makeSlug } from '../../utils/functions';

function Navbar() {
  const {
    user,
    cart,
  } = useContext(Context);
  const navigate = useNavigate();
  const { width } = useBreakpoints();
  const [searchResults, setSearchResults] = useState<IShopProduct[]>([]);
  const searchParams: QueryReqFetchMultipleShopProducts = {
    attributes: ['name', 'id', 'thumbnail'],
    search: '', // server controller method for ShopProducts is configured to to search model Specification according to these parameters and match associated ShopProducts,
    limit: 5,
  };
  const navigateCallback = (product: IShopProduct) => {
    const slug = makeSlug(product.name);
    navigate(`${SHOP_ROUTE}/${slug}`);
  };
  const cartCount = cart.items.length || 0;
  const showCartAsGuest = cartCount > 0;
  return (
    <nav id="navbar" className="navbar">
      <NavLink
        className="logo"
        to="/"
      >
        <img
          src={width <= 991 ? logoMedium : logoSmall}
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
        {(user.isRegistered || showCartAsGuest) && (
          <NavButton className="cart-link" to={CART_ROUTE}>
            Cart
            {' '}
            {`(${cartCount.toString()})`}
          </NavButton>
        )}
        {!user.isRegistered && (
          <NavButton className="account-link" to={LOGIN_ROUTE}>
            <AccountIcon />
            Login
          </NavButton>
        )}
        {user.isRegistered && (
          <Dropdown
            label="Account"
            to={user.isAdmin ? [{ to: ADMIN_ROUTE, label: 'Admin' }, ...navbarAccountButtons] : navbarAccountButtons}
            dropdownIcon="account"
            className="account-link"
          />
        )}
        <Search
          searchParams={searchParams}
          fetchHandler={fetchProducts}
          results={searchResults}
          setResults={setSearchResults}
          Result={SearchResult}
          endItemsInResults={[{ label: 'Shop more', to: SHOP_ROUTE, className: 'shop-more-link' }]}
          EndItem={EndItem}
          placeholder="Search shop"
          callback={navigateCallback}
        />
      </div>
    </nav>
  );
}

export default observer(Navbar);
