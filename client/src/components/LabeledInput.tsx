import React from 'react';
import Input, { InputProps } from './Input';

interface LabeledInputProps extends InputProps {
  label: string;
  subscript?: string;
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
  type,
  id,
}: LabeledInputProps) {
  return (
    <div className="labeled-input">
      <span className="label">
        {label}
      </span>
      <Input
        input={input}
        setInput={setInput}
        setPressedSubmit={setPressedSubmit}
        pressedSubmit={pressedSubmit}
        placeholder={placeholder}
        textarea={textarea}
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
};

export default LabeledInput;
