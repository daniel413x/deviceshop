import React from 'react';
import { INavButton } from '../types/types';
import Dropdown from './Dropdown';

type SortButton = Omit<INavButton, 'to'>;

interface SortingDropdownProps {
  sortButtons: SortButton[];
  label: string;
}

function SortingDropdown({
  sortButtons,
  label,
}: SortingDropdownProps) {
  return (
    <div className="sort-dropdown">
      <span>
        Sort by:
      </span>
      <Dropdown
        label={label || sortButtons[0].label}
        to={sortButtons}
        dropdownIcon="angle"
        colorStyle="gray"
      />
      <div className="divider vertical" />
    </div>
  );
}

export default SortingDropdown;
