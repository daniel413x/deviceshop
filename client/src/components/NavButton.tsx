import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { INavButton } from '../types/types';

interface NavButtonProps {
  to: string | INavButton[];
  children: ReactElement | (ReactElement | string)[] | string;
  className?: string;
}

function NavButton({
  to,
  children,
  className,
}: NavButtonProps) {
  return (
    <NavLink className={`nav-button ${className}`} to={to as string}>
      {children}
    </NavLink>
  );
}

NavButton.defaultProps = {
  className: '',
};

export default NavButton;
