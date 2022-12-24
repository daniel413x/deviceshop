import React from 'react';
import Button from './Button';
import Modal from './Modal';

interface ConfirmationModalProps {
  show: any;
  callback: (...args: any[]) => void;
  close: () => void;
  promptText: string;
}

function ConfirmationModal({
  show,
  close,
  callback,
  promptText,
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
      <div className="body">
        {promptText}
      </div>
      <div className="bottom-buttons">
        <Button
          buttonStyle="warn"
          onClick={confirm}
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

export default ConfirmationModal;
