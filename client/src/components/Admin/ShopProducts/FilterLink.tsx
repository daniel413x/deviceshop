import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

interface FilterLinkProps {
  label: string;
  to: string;
}

function FilterLink({
  label,
  to,
}: FilterLinkProps) {
  return (
    <NavLink
      to={to}
      className="filter-link"
    >
      {label}
    </NavLink>
  );
}

export default observer(FilterLink);
