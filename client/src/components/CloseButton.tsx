import React, {
  forwardRef, RefObject, useEffect, useRef,
} from 'react';
import { ReactComponent as Close } from '../assets/icons/close.svg';
import useActiveElement from '../hooks/useActiveElement';
import useKeyPress from '../hooks/useKeyPress';

interface CloseButtonProps {
  onMouseDown: () => void;
}

const CloseButton = forwardRef(({
  onMouseDown,
}: CloseButtonProps, passedInRef: any) => {
  const ref = passedInRef || useRef<HTMLButtonElement>();
  const enterPress = useKeyPress('Enter');
  const focus = useActiveElement();
  useEffect(() => {
    if (focus === ref.current) {
      onMouseDown();
    }
  }, [enterPress]);
  return (
    <button
      ref={ref}
      className="close-button"
      onClick={onMouseDown}
      onMouseDown={onMouseDown}
      type="button"
    >
      <Close />
    </button>
  );
});

export default CloseButton as (props: CloseButtonProps & { ref?: RefObject<any> }) => JSX.Element;
