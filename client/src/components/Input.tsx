import React, { useState, useEffect, ChangeEvent } from 'react';

export interface InputProps {
  input: string;
  setInput: (e: string) => void;
  setPressedSubmit?: (boolean: boolean) => void;
  pressedSubmit?: boolean;
  name?: string;
  placeholder?: string;
  textarea?: boolean;
  type?: 'password' | 'input' | 'email';
  id?: string;
  optional?: boolean;
}

function Input({
  input,
  setInput,
  name,
  setPressedSubmit,
  pressedSubmit,
  placeholder,
  textarea,
  id,
  type,
  optional,
}: InputProps) {
  const [incomplete, setIncomplete] = useState<boolean>(false);
  const removeWarning = () => {
    if (incomplete && setPressedSubmit) {
      setIncomplete(false);
      setPressedSubmit(false);
    }
  };
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    removeWarning();
    setInput(e.target.value);
  };
  const changeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    removeWarning();
    setInput(e.target.value);
  };
  useEffect(() => {
    if (!optional && pressedSubmit && !input) {
      setIncomplete(true);
    }
  }, [pressedSubmit]);
  return textarea ? (
    <textarea
      className={`textarea ${incomplete && 'warn'}`}
      placeholder={placeholder}
      value={input}
      onChange={(e) => changeTextarea(e)}
      id={id}
      onClick={() => removeWarning()}
      name={name}
    />
  ) : (
    <input
      className={`input ${incomplete && 'warn'}`}
      placeholder={placeholder}
      value={input}
      onChange={(e) => changeInput(e)}
      onClick={() => removeWarning()}
      type={type}
      name={name}
      id={id}
    />
  );
}

Input.defaultProps = {
  setPressedSubmit: false,
  pressedSubmit: false,
  placeholder: false,
  textarea: false,
  optional: false,
  type: '',
  name: '',
  id: false,
};

export default Input;
