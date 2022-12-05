import React from 'react';
import { ReactComponent as SliderAngleButtonIcon } from '../assets/icons/slider-angle-button.svg';

interface SliderButtonProps {
  className: string;
  func: () => void;
}

function SliderAngleButton({ func, className }: SliderButtonProps) {
  return (
    <button
      className={`angle-button ${className}`}
      onClick={func}
      type="button"
    >
      <SliderAngleButtonIcon />
    </button>
  );
}

export default SliderAngleButton;
