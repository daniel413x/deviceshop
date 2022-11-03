import React from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

interface EndItemProps {
  endItem: {
    label: string;
    to: string;
    className: string;
  };
}

const EndItem = observer(({
  endItem,
}: EndItemProps) => {
  const {
    label,
    to,
    className,
  } = endItem;
  return (
    <NavLink className={`results-item ${className}`} to={to}>
      {label}
    </NavLink>
  );
});

export default EndItem;
