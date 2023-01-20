import React, {
  ChangeEvent,
  forwardRef,
  RefObject,
  useRef,
} from 'react';
import { ReactComponent as EditIcon } from '../assets/icons/Edit.svg';
import useInputIncomplete from '../hooks/useInputIncomplete';
import Button from './Button';

export interface InputProps {
  input: string;
  setInput: (e: string) => void;
  setPressedSubmit?: (boolean: boolean) => void;
  pressedSubmit?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  textarea?: boolean;
  type?: 'password' | 'input' | 'email';
  id?: string;
  inputStyle?: 'matchSpan';
  warnCondition?: boolean;
}

const Input = forwardRef(({
  input,
  setInput,
  name,
  setPressedSubmit,
  pressedSubmit,
  placeholder,
  textarea,
  id,
  type,
  inputStyle,
  className,
  warnCondition,
}: InputProps, focusRef: any) => {
  const {
    warn,
    removeWarning,
  } = useInputIncomplete({
    value: input,
    setPressedSubmit,
    pressedSubmit,
    condition: warnCondition,
  });
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const changeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    removeWarning();
    setInput(e.target.value);
  };
  const defaultFocusRef = useRef<HTMLInputElement>(null);
  const focusValueField = () => {
    defaultFocusRef.current?.focus();
  };
  const BaseJSX = (
    <input
      className={`input ${warn && 'warn'} ${inputStyle === 'matchSpan' && 'emulate-span'}`}
      placeholder={placeholder}
      value={input}
      onChange={(e) => changeInput(e)}
      onFocus={() => removeWarning()}
      type={type}
      name={name}
      id={id}
      ref={focusRef || defaultFocusRef}
    />
  );
  if (inputStyle === 'matchSpan') {
    return (
      <div className={`span-input-wrapper ${className}`}>
        <span className="relative-span">
          <span>
            {input}
          </span>
          {BaseJSX}
        </span>
        <Button
          buttonStyle="blank"
          onClick={focusValueField}
          className="edit-button"
        >
          <EditIcon />
        </Button>
      </div>
    );
  }
  if (textarea) {
    return (
      <textarea
        className={`textarea ${warn && 'warn'}`}
        placeholder={placeholder}
        value={input}
        onChange={(e) => changeTextarea(e)}
        id={id}
        onFocus={() => removeWarning()}
        name={name}
        ref={focusRef}
      />
    );
  }
  return BaseJSX;
});

Input.defaultProps = {
  setPressedSubmit: undefined,
  pressedSubmit: false,
  warnCondition: false,
  placeholder: '',
  textarea: false,
  className: '',
  type: undefined,
  name: '',
  id: '',
  inputStyle: undefined,
};

export default Input as (props: InputProps & { focusRef?: RefObject<HTMLInputElement> }) => JSX.Element;
