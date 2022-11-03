import React from 'react';
import { NavLink } from 'react-router-dom';
import { INavButton } from '../types/types';

interface NavButtonProps {
  to: string | INavButton[];
  label: string;
}

function NavButton({ to, label }: NavButtonProps) {
  return (
    <NavLink className="nav-button" to={to as string}>
      {label}
    </NavLink>
  );
}

export default NavButton;
