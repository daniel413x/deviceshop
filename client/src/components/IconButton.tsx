import React from 'react';
import Button from './Button';

interface IconButtonProps {
  onClick: (args: any[]) => void;
  Icon: any; // svg component
  className?: string;
  iconStyle?: 'warn';
}

function IconButton({
  Icon,
  onClick,
  className,
  iconStyle,
}: IconButtonProps) {
  return (
    <Button
      className={`icon-button ${className} ${iconStyle}`}
      buttonStyle="blank"
      onClick={onClick}
    >
      <Icon />
    </Button>
  );
}

IconButton.defaultProps = {
  className: '',
  iconStyle: '',
};

export default IconButton;
