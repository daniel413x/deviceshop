import React, { useState } from 'react';
import { ReactComponent as CopyIcon } from '../../../../assets/icons/Copy.svg';
import CopySpecificationsModal from './CopySpecificationsModal';

function CopySpecificationsButton() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <button
      className="categories-control-button"
      onClick={() => setShowModal(true)}
      type="button"
    >
      <CopySpecificationsModal
        show={showModal}
        close={() => setShowModal(false)}
      />
      <CopyIcon
        className="icon"
      />
      <span className="label">
        Copy specifications
      </span>
    </button>
  );
}

export default CopySpecificationsButton;
