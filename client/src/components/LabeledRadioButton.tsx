import React, {
  useState, useRef, MouseEvent, useEffect,
} from 'react';
import useOnClickOutside from '../hooks/useOnOutsideClick';

interface LabeledCheckboxButtonProps {
  label: string;
  name: string;
  boolean: boolean;
  onClick: () => void;
  className?: string;
  light?: boolean;
  id: string;
  warn?: boolean;
  value: any;
}

function LabeledCheckboxButton({
  label,
  boolean,
  name,
  className,
  light,
  id,
  onClick,
  warn,
  value,
}: LabeledCheckboxButtonProps) {
  const [active, setActive] = useState<boolean>(false);
  const [boxShadow, setBoxShadow] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);
  const radioRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(ref, () => setBoxShadow(false));
  useEffect(() => {
    setBoxShadow(boolean);
  }, [boolean]);
  let boxShadowVal = null;
  if (light && boxShadow) {
    boxShadowVal = 'box-shadow-light';
  } else if (boxShadow) {
    boxShadowVal = 'box-shadow';
  }
  const clickHandler = () => {
    onClick();
    radioRef.current?.click();
  };
  // !pressedEnter && !
  return (
    <button
      className={`labeled-radio-button ${boolean && 'checked'} ${active && 'active'} ${className} ${warn && 'warn'}`}
      ref={ref}
      type="button"
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      onMouseDown={() => setActive(true)}
      onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
        if (e.buttons > 0) {
          setActive(true);
        }
      }}
      onClick={clickHandler}
    >
      <div className={`radio-div ${boolean && 'checked'} ${active && 'active'} ${boxShadowVal}`} />
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        className="radio-input-overlay"
        ref={radioRef}
        tabIndex={-1}
      />
      <label className="label" htmlFor={id}>
        {label}
      </label>
    </button>
  );
}

LabeledCheckboxButton.defaultProps = {
  light: false,
  className: '',
  warn: false,
};

export default LabeledCheckboxButton;
