import React from 'react';
import { NavLink } from 'react-router-dom';

interface IconNavlinkProps {
  to: string;
  Icon: any; // svg component
  className?: string;
  iconStyle?: 'warn';
}

function IconNavlink({
  to,
  Icon,
  className,
  iconStyle,
}: IconNavlinkProps) {
  return (
    <NavLink
      to={to}
      className={`icon-button ${className} ${iconStyle}`}
    >
      <Icon className="svg" />
    </NavLink>
  );
}

IconNavlink.defaultProps = {
  className: '',
  iconStyle: '',
};

export default IconNavlink;
