import React from 'react';
import useInputIncomplete from '../hooks/useInputIncomplete';
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
  className,
  warnCondition,
}: LabeledInputProps) {
  const {
    warn,
  } = useInputIncomplete({
    value: input,
    setPressedSubmit,
    pressedSubmit,
    condition: warnCondition,
  });
  return (
    <div className={`labeled-input ${warn && 'warn'} ${className}`}>
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
        placeholder={placeholder}
        textarea={textarea}
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
