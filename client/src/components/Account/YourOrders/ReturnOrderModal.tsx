import React from 'react';
import Address from '../../Address';
import CloseButton from '../../CloseButton';
import Modal from '../../Modal';

interface ReturnOrderModalProps {
  close: () => void;
  returnedOrderId: string;
}

function ReturnOrderModal({
  close,
  returnedOrderId,
}: ReturnOrderModalProps) {
  const returnAddress = {
    firstName: 'Daniel',
    lastName: 'Maramba',
    addressLineOne: '8585 Wisconsin Avenue NW',
    city: 'Washington',
    state: 'DC',
    zip: '20008',
  };
  return (
    <Modal
      show={returnedOrderId}
      close={close}
      className="return-order"
      id="return-order"
      size="medium"
    >
      <div className="window-header">
        <div className="left-col">
          <span className="name">
            {`Order ${returnedOrderId}`}
          </span>
        </div>
        <CloseButton
          callback={close}
        />
      </div>
      <div className="body">
        <h2>
          Returns
        </h2>
        <p>
          To initiate a return, please mail your return package to our shop address listed below. You may make either a partial return of individual items or a full return of your order.
        </p>
        <Address
          address={returnAddress}
        />
      </div>
    </Modal>
  );
}

export default ReturnOrderModal;
