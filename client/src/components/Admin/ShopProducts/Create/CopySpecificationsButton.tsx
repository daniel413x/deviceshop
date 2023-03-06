import React, { useState } from 'react';
import { ReactComponent as CopyIcon } from '../../../../assets/icons/Copy.svg';
import RefocusedElement from '../../../RefocusedElement';
import CopySpecificationsModal from './CopySpecificationsModal';

function CopySpecificationsButton() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <RefocusedElement>
      <button
        className="copy-specifications-button categories-control-button"
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
    </RefocusedElement>
  );
}

export default CopySpecificationsButton;
