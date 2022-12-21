import React from 'react';
import { ReactComponent as AngleIcon } from '../assets/icons/angleup.svg';

interface AngleDownIconProps {
  className?: string;
  inverse?: boolean;
}

function AngleDownIcon({ className, inverse }: AngleDownIconProps) {
  return (
    <AngleIcon className={`angle-down-icon ${className} ${inverse && 'inverse'}`} />
  );
}

AngleDownIcon.defaultProps = {
  className: '',
  inverse: false,
};

export default AngleDownIcon;
