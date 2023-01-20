import React, {
  useState, useRef, MouseEvent, useEffect,
} from 'react';
import useInputIncomplete from '../hooks/useInputIncomplete';
import useOnClickOutside from '../hooks/useOnOutsideClick';

interface LabeledRadioButtonProps {
  label: string;
  name: string;
  boolean: boolean;
  onClick: () => void;
  id: string;
  value: any;
  className?: string;
  light?: boolean;
  warnCondition?: boolean;
  selectedValue?: any;
  pressedSubmit?: boolean;
  setPressedSubmit?: (bool: boolean) => void;
}

function LabeledRadioButton({
  label,
  boolean,
  name,
  className,
  light,
  id,
  onClick,
  warnCondition,
  value,
  selectedValue,
  pressedSubmit,
  setPressedSubmit,
}: LabeledRadioButtonProps) {
  const {
    warn,
  } = useInputIncomplete({
    condition: warnCondition,
    pressedSubmit,
    setPressedSubmit,
    value: selectedValue,
  });
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

LabeledRadioButton.defaultProps = {
  light: false,
  className: '',
  warnCondition: false,
  pressedSubmit: undefined,
  setPressedSubmit: undefined,
  selectedValue: undefined,
};

export default LabeledRadioButton;
