import { observer } from 'mobx-react-lite';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDom from 'react-dom';
import Context from '../context/context';
import useOnOutsideClick from '../hooks/useOnOutsideClick';
import useTrackDimensions from '../hooks/useTrackDimensions';
import { Children } from '../types/types';

interface ModalProps {
  show: any;
  close: () => void;
  children?: Children;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  id: string;
  modalStyle?: 'warn';
}

function Modal({
  show,
  children,
  close,
  className,
  size,
  id,
  modalStyle,
}: ModalProps) {
  const [handleOverflow, setHandleOverflow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const { width: windowWidth, height: windowHeight } = useTrackDimensions();
  useOnOutsideClick(ref, close);
  const { modals } = useContext(Context);
  useEffect(() => {
    if (!show) {
      modals.unqueue(id);
      setTimeout(() => ref.current?.scrollTo(0, 0), 500);
    } else {
      modals.queue(id);
    }
  }, [show]);
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
    <div className={`modal ${(show) && 'show'} ${className} ${size} ${handleOverflow && 'handle-overflow'} ${modalStyle}`}>
      <div className="overlay" />
      <div
        className="window"
        ref={ref}
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal')!,
  );
}

Modal.defaultProps = {
  children: undefined,
  className: '',
  size: '',
  modalStyle: '',
};

export default observer(Modal);
