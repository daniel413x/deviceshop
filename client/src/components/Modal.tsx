import { observer } from 'mobx-react-lite';
import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
} from 'react';
import ReactDom from 'react-dom';
import Context from '../context/context';
import useOnOutsideClick from '../hooks/useOnOutsideClick';

interface ModalProps {
  show: any;
  close: () => void;
  children?: ReactElement | (ReactElement | string)[] | string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  id: string;
}

function Modal({
  show,
  children,
  close,
  className,
  size,
  id,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnOutsideClick(ref, close);
  const { modals } = useContext(Context);
  const firstInQueue = modals.all[0] === id;
  useEffect(() => {
    if (!show) {
      modals.unqueue(id);
    } else {
      modals.queue(id);
    }
  }, [show]);
  return ReactDom.createPortal(
    <div className={`modal ${(firstInQueue && show) && 'show'} ${className} ${size}`}>
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
  children: false,
  className: '',
  size: '',
};

export default observer(Modal);
