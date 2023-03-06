import React, { forwardRef, RefObject } from 'react';
import { Children } from '../types/types';

type ButtonStyles = 'primary' | 'secondary' | 'warn' | 'blank' | 'accent-gray' | 'match-navlink' | 'add-to-cart';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: (...args: any[]) => void;
  onMouseDown?: (...args: any[]) => void;
  children?: Children;
  buttonStyle?: ButtonStyles | ButtonStyles[];
  title?: string;
  id?: string;
  tabIndex?: number;
}

const Button = forwardRef(({
  type,
  className,
  onClick,
  onMouseDown,
  children,
  buttonStyle,
  title,
  id,
  tabIndex,
}: ButtonProps, passedInRef: any) => (
  <button
    ref={passedInRef}
    title={title}
    className={`button ${Array.isArray(buttonStyle) ? buttonStyle.join(' ') : buttonStyle} ${className}`}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
    onMouseDown={onMouseDown}
    id={id}
    tabIndex={tabIndex}
  >
    {children}
  </button>
));

Button.defaultProps = {
  type: 'button',
  title: '',
  className: '',
  id: undefined,
  children: false,
  onClick: () => null,
  onMouseDown: () => null,
  buttonStyle: 'primary',
  tabIndex: 0,
};

export default Button as (props: ButtonProps & { ref?: RefObject<any> }) => JSX.Element;
