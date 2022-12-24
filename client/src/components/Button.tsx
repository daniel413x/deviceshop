import React, { ReactElement } from 'react';

type ButtonStyles = 'primary' | 'secondary' | 'warn' | 'blank' | 'accent-gray' | 'match-navlink';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: (...args: any[]) => void;
  children?: ReactElement | (ReactElement | string)[] | string;
  buttonStyle?: ButtonStyles | ButtonStyles[];
  title?: string;
  id?: string;
}

function Button({
  type,
  className,
  onClick,
  children,
  buttonStyle,
  title,
  id,
}: ButtonProps) {
  return (
    <button
      title={title}
      className={`button ${Array.isArray(buttonStyle) ? buttonStyle.join(' ') : buttonStyle} ${className}`}
    // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      id={id}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  title: '',
  className: '',
  id: undefined,
  children: false,
  onClick: () => null,
  buttonStyle: 'primary',
};

export default Button;
