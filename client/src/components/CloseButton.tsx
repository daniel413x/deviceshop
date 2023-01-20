import React from 'react';
import { ReactComponent as Close } from '../assets/icons/close.svg';

interface CloseButtonProps {
  onMouseDown?: () => void;
  onClick?: () => void;
}

function CloseButton({
  onMouseDown,
  onClick,
}: CloseButtonProps) {
  return (
    <button
      className="close-button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      type="button"
    >
      <Close />
    </button>
  );
}

CloseButton.defaultProps = {
  onClick: undefined,
  onMouseDown: undefined,
};

export default CloseButton;
