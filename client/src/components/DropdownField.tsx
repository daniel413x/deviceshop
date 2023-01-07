import React from 'react';
import useInputIncomplete from '../hooks/useInputIncomplete';
import { INavButton, RequireAll } from '../types/types';
import Dropdown from './Dropdown';

type AllOrNoneProps = RequireAll<{
  pressedSubmit?: boolean;
  setPressedSubmit?: (bool: boolean) => void;
}>;

type DropdownFieldProps = {
  placeholder?: string;
  label: string;
  items: string | INavButton[];
  value: string | undefined;
  colorStyle?: 'gray' | 'accent' | 'white' | 'accent-secondary';
} & AllOrNoneProps;

function DropdownField({
  placeholder,
  items,
  value,
  label,
  colorStyle,
  pressedSubmit,
  setPressedSubmit,
}: DropdownFieldProps) {
  const {
    warn,
  } = useInputIncomplete({
    input: value,
    setPressedSubmit,
    pressedSubmit,
  });
  return (
    <div className={`dropdown-field ${warn && 'warn'}`}>
      <Dropdown
        label={label}
        dropdownIcon="triangle"
        to={items}
        colorStyle={colorStyle}
      />
      <span className="value">
        {value || placeholder}
      </span>
    </div>
  );
}

DropdownField.defaultProps = {
  placeholder: '',
  colorStyle: '',
};

export default DropdownField;
