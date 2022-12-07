import React, { ReactElement } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: (...args: any[]) => void;
  children?: ReactElement | (ReactElement | string)[] | string;
  buttonStyle?: 'primary' | 'secondary' | 'warn' | 'blank';
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
      className={`button ${buttonStyle} ${className}`}
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
  id: '',
  children: false,
  onClick: () => null,
  buttonStyle: 'primary',
};

export default Button;
