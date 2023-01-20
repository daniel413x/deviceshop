import React from 'react';
import Button from './Button';
import CloseButton from './CloseButton';
import Modal from './Modal';

interface ConfirmationModalProps {
  show: any;
  callback: (...args: any[]) => void;
  close: () => void;
  prompt: string;
  title?: string;
}

function ConfirmationModal({
  show,
  close,
  callback,
  prompt,
  title,
}: ConfirmationModalProps) {
  const confirm = () => {
    callback();
    close();
  };
  return (
    <Modal
      show={show}
      close={close}
      className="confirmation-modal"
      id="confirmation-modal"
      modalStyle="warn"
    >
      {title && (
        <div className="window-header">
          <div className="left-col">
            {title}
          </div>
          <CloseButton
            onMouseDown={close}
          />
        </div>
      )}
      <div className="body">
        {prompt}
      </div>
      <div className="bottom-buttons">
        <Button
          buttonStyle="warn"
          onClick={confirm}
          className="confirm-button"
        >
          Confirm
        </Button>
        <Button
          buttonStyle="warn"
          onClick={close}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

ConfirmationModal.defaultProps = {
  title: '',
};

export default ConfirmationModal;
