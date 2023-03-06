import React, { forwardRef, RefObject } from 'react';
import Button from './Button';

interface IconButtonProps {
  onClick: (args: any[]) => void;
  Icon: any; // svg component
  className?: string;
  iconStyle?: 'warn' | '';
  tabIndex?: number;
}

const IconButton = forwardRef(({
  Icon,
  onClick,
  className,
  iconStyle,
  tabIndex,
}: IconButtonProps, passedInRef: any) => (
  <Button
    className={`icon-button ${className} ${iconStyle}`}
    buttonStyle="blank"
    onClick={onClick}
    tabIndex={tabIndex}
    ref={passedInRef}
  >
    <Icon />
  </Button>
));

IconButton.defaultProps = {
  className: '',
  iconStyle: '',
  tabIndex: 0,
};

export default IconButton as (props: IconButtonProps & { ref?: RefObject<any> }) => JSX.Element;
