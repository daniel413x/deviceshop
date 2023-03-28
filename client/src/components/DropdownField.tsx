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
  name: string;
  items: string | INavButton[];
  value: string | undefined;
  shownValue?: string | undefined; // e.g. show a name/logical key instead of an id
  colorStyle?: 'gray' | 'accent' | 'white' | 'accent-secondary';
} & AllOrNoneProps;

function DropdownField({
  placeholder,
  items,
  value,
  name,
  shownValue,
  label,
  colorStyle,
  pressedSubmit,
  setPressedSubmit,
}: DropdownFieldProps) {
  const {
    warn,
  } = useInputIncomplete({
    value,
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
        {shownValue || value || placeholder}
      </span>
      <input
        id={`${name}_dropdown`}
        type="hidden"
        name={name}
        value={value}
      />
    </div>
  );
}

DropdownField.defaultProps = {
  placeholder: '',
  colorStyle: '',
  shownValue: undefined,
};

export default DropdownField;
