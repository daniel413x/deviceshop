import React from 'react';
import { useLocation } from 'react-router-dom';
import { adminSideColLinks } from '../../utils/arrays';
import Dropdown from '../Dropdown';
import List from '../List';

function AdminSideCol() {
  const { pathname } = useLocation();
  const showInMobile = pathname === '/admin';
  return (
    <div className={`left-side-col ${showInMobile && 'show'}`}>
      <div className="labeled-col">
        <span className="label">
          Admin
        </span>
        <List
          items={adminSideColLinks}
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

export default AdminSideCol;
