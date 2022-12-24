import React from 'react';
import { NavLink } from 'react-router-dom';
import { Children, INavButton } from '../types/types';

type NavButtonStyles = 'match-button' | 'secondary';

interface NavButtonProps {
  to: string | INavButton[];
  children?: Children;
  className?: string;
  buttonStyle?: NavButtonStyles | NavButtonStyles[];
}

function NavButton({
  to,
  children,
  className,
  buttonStyle,
}: NavButtonProps) {
  return (
    <NavLink className={`nav-button ${className} ${Array.isArray(buttonStyle) ? buttonStyle.join(' ') : buttonStyle}`} to={to as string}>
      {children}
    </NavLink>
  );
}

NavButton.defaultProps = {
  className: '',
  buttonStyle: '',
  children: false,
};

export default NavButton;
