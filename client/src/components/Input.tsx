import React, { useState, useEffect, ChangeEvent } from 'react';

export interface InputProps {
  input: string;
  setInput: (e: string) => void;
  setPressedSubmit?: (boolean: boolean) => void;
  pressedSubmit?: boolean;
  placeholder?: string;
  textarea?: boolean;
  type?: 'password' | 'input' | 'email';
  id?: string;
}

function Input({
  input,
  setInput,
  setPressedSubmit,
  pressedSubmit,
  placeholder,
  textarea,
  id,
  type,
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
    if (pressedSubmit && !input) {
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
    />
  ) : (
    <input
      className={`input ${incomplete && 'warn'}`}
      placeholder={placeholder}
      value={input}
      onChange={(e) => changeInput(e)}
      onClick={() => removeWarning()}
      type={type}
      id={id}
    />
  );
}

Input.defaultProps = {
  setPressedSubmit: false,
  pressedSubmit: false,
  placeholder: false,
  textarea: false,
  type: '',
  id: '',
};

export default Input;
