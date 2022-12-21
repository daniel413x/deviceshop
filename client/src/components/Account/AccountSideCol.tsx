import React from 'react';
import { accountNavButtons } from '../../utils/arrays';
import Dropdown from '../Dropdown';
import List from '../List';

function AccountSideCol() {
  return (
    <div className="side-col">
      <div className="labeled-col">
        <span className="label">
          Your account
        </span>
        <List
          items={accountNavButtons}
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
