import React, { useState, useEffect, ChangeEvent } from 'react';

interface InputProps {
  input: string;
  setInput: (e: string) => void;
  setPressedSubmit?: (boolean: boolean) => void;
  pressedSubmit?: boolean;
  placeholder?: string;
  textarea?: boolean;
}

function Input({
  input,
  setInput,
  setPressedSubmit,
  pressedSubmit,
  placeholder,
  textarea,
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
      onClick={() => removeWarning()}
    />
  ) : (
    <input
      className={`input ${incomplete && 'warn'}`}
      placeholder={placeholder}
      value={input}
      onChange={(e) => changeInput(e)}
      onClick={() => removeWarning()}
    />
  );
}

Input.defaultProps = {
  setPressedSubmit: false,
  pressedSubmit: false,
  placeholder: false,
  textarea: false,
};

export default Input;
