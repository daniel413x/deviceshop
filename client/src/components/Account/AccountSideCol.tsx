import React from 'react';
import { useLocation } from 'react-router-dom';
import { accountSideColLinks } from '../../utils/arrays';
import Dropdown from '../Dropdown';
import List from '../List';

function AccountSideCol() {
  const { pathname } = useLocation();
  const showInMobile = pathname === '/account';
  return (
    <div className={`left-side-col ${showInMobile && 'show'}`}>
      <div className="labeled-col">
        <span className="label">
          Your account
        </span>
        <List
          items={accountSideColLinks}
          renderAs={({ to, label }) => (
            <li key={`${to}_navButton`}>
              <div className="divider" />
              <Dropdown
                to={to}
                label={label}
              />
            </li>
          )}
        />
      </div>
    </div>
  );
}

export default AccountSideCol;
