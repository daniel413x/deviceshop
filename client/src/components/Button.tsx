import React, { ReactElement } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: (...args: any[]) => void;
  children?: ReactElement | (ReactElement | string)[] | string;
  buttonStyle?: 'primary' | 'secondary' | 'warn';
  title?: string;
}

function Button({
  type,
  className,
  onClick,
  children,
  buttonStyle,
  title,
}: ButtonProps) {
  return (
    <button
      title={title}
      className={`button ${buttonStyle} ${className}`}
    // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  title: '',
  className: '',
  children: false,
  onClick: () => null,
  buttonStyle: 'primary',
};

export default Button;
