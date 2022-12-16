import React from 'react';
import Input, { InputProps } from './Input';

interface LabeledInputProps extends InputProps {
  label: string;
  subscript?: string;
  labelSubscript?: string;
}

function LabeledInput({
  label,
  input,
  setInput,
  setPressedSubmit,
  pressedSubmit,
  placeholder,
  textarea,
  subscript,
  labelSubscript,
  type,
  name,
  id,
  optional,
}: LabeledInputProps) {
  return (
    <div className="labeled-input">
      <label htmlFor={id} className="label">
        {label}
        {' '}
        {labelSubscript && (
        <span className="label-subscript">
          {labelSubscript}
        </span>
        )}
      </label>
      <Input
        input={input}
        setInput={setInput}
        setPressedSubmit={setPressedSubmit}
        pressedSubmit={pressedSubmit}
        placeholder={placeholder}
        textarea={textarea}
        optional={optional}
        name={name}
        type={type}
        id={id}
      />
      {subscript && (
      <span className="subscript">
        {subscript}
      </span>
      )}
    </div>
  );
}

LabeledInput.defaultProps = {
  subscript: '',
  labelSubscript: '',
};

export default LabeledInput;
