import React, { ReactElement } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: (...args: any[]) => void;
  children?: ReactElement | (ReactElement | string)[] | string;
}

function Button({
  type,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`button ${className}`}
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
  className: '',
  children: false,
  onClick: false,
};

export default Button;
