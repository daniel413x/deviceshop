/* eslint-disable react/prop-types */
import FocusTrap from 'focus-trap-react';
import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useContext,
} from 'react';
import ReactDom from 'react-dom';
import Context from '../context/context';
import useKeyPress from '../hooks/useKeyPress';
import useOnOutsideClick from '../hooks/useOnOutsideClick';
import useTrackDimensions from '../hooks/useTrackDimensions';
import { Children } from '../types/types';
import { falsy } from '../utils/consts';

interface ModalProps {
  show: any;
  close: () => void;
  children?: Children;
  className?: string;
  size?: '' | 'small' | 'medium' | 'large';
  id: string;
  modalStyle?: 'warn';
}

const Modal = forwardRef(({
  show,
  children,
  close,
  className,
  size,
  id,
  modalStyle,
}: ModalProps, passedInRef: any) => {
  const {
    modals,
  } = useContext(Context);
  const [handleOverflow, setHandleOverflow] = useState<boolean>(false);
  const ref = passedInRef || useRef<HTMLDivElement>(null);
  const { width: windowWidth, height: windowHeight } = useTrackDimensions();
  useOnOutsideClick(ref, close);
  const escapePress = useKeyPress('Escape');
  useEffect(() => {
    if (!show) {
      modals.unqueue(id);
      setTimeout(() => ref.current?.scrollTo(0, 0), 500);
    } else {
      modals.queue(id);
    }
  }, [show]);
  useEffect(() => {
    if (escapePress) {
      close();
    }
  }, [escapePress]);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (ref.current.scrollHeight > windowHeight!) {
      setHandleOverflow(true);
    } else {
      setHandleOverflow(false);
    }
  }, [windowWidth, windowHeight, ref.current?.scrollHeight]);
  return ReactDom.createPortal(
    <FocusTrap
      active={show !== falsy}
      paused={!show}
      focusTrapOptions={{
        escapeDeactivates: false,
      }}
    >
      <div className={`modal ${(show) && 'show'} ${className} ${size} ${handleOverflow && 'handle-overflow'} ${modalStyle}`}>
        <div className="overlay" />
        <div
          className="window"
          ref={ref}
        >
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.getElementById('portal')!,
  );
});

Modal.defaultProps = {
  children: undefined,
  className: '',
  size: '',
  modalStyle: undefined,
};

export default Modal as (props: ModalProps & { ref?: RefObject<any> }) => JSX.Element;
