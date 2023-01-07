import React from 'react';
import { ReactComponent as Close } from '../assets/icons/close.svg';

interface CloseButtonProps {
  callback: () => void;
}

function CloseButton({
  callback,
}: CloseButtonProps) {
  return (
    <button
      className="close-button"
      onMouseDown={callback}
      type="button"
    >
      <Close />
    </button>
  );
}

export default CloseButton;
