import React, { useContext, useState, FormEvent } from 'react';
import Context from '../../../context/context';
import { editOrder } from '../../../http/orderAPI';
import { IOrder } from '../../../types/types';
import { CANCELLATION_REQUESTED } from '../../../utils/consts';
import Button from '../../Button';
import CloseButton from '../../CloseButton';
import LabeledRadioButton from '../../LabeledRadioButton';
import List from '../../List';
import Modal from '../../Modal';

interface RequestCancellationModalProps {
  canceledOrder: IOrder;
  orders: IOrder[];
  close: () => void;
  setOrders: (items: IOrder[]) => void;
}

function RequestCancellationModal({
  canceledOrder,
  close,
  orders,
  setOrders,
}: RequestCancellationModalProps) {
  const {
    notifications,
  } = useContext(Context);
  const {
    id,
    status,
  } = canceledOrder;
  const [success, setSuccess] = useState<boolean>(false);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const formButtons = [
    {
      label: 'I found a better deal',
      id: 'foundBetterDeal',
      onClick: () => setReason('foundBetterDeal'),
    },
    {
      label: 'Shipping too slow',
      id: 'shippingTooSlow',
      onClick: () => setReason('shippingTooSlow'),
    },
    {
      label: 'I changed my mind on this purchase',
      id: 'changedMind',
      onClick: () => setReason('changedMind'),
    },
    {
      label: 'Other/Unlisted reason',
      id: 'unlistedReason',
      onClick: () => setReason('unlistedReason'),
    },
  ];
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setPressedSubmit(true);
    try {
      await editOrder(id, { status: [...status, CANCELLATION_REQUESTED] });
      setSuccess(true);
      setOrders(orders.map((order) => (order.id === id ? { ...order, status: [...order.status, CANCELLATION_REQUESTED] } : order)));
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    }
  };
  return (
    <Modal
      show={id}
      close={close}
      className="request-cancellation"
      id="request-cancellation"
      size="large"
    >
      <div className="window-header">
        <div className="left-col">
          <span className="name">
            {`Order ${id}`}
          </span>
        </div>
        <CloseButton
          callback={close}
        />
      </div>
      <form onSubmit={submit}>
        {success ? (
          <div className="body success">
            <h2 className="header">
              Cancel this order
            </h2>
            <p>
              Your order was marked for cancellation. This window can be closed.
            </p>
          </div>
        ) : (
          <div className="body">
            <h2 className="header">
              Cancel this order
            </h2>
            <p>
              We will act to the best of our ability to cancel your order depending on its processing status.
            </p>
            <div />
            <p>
              (Optional) Tell us why you are canceling your order.
            </p>
            <List
              className="radio-button-ul"
              items={formButtons}
              renderAs={(button) => (
                <li key={button.id}>
                  <LabeledRadioButton
                    onClick={button.onClick}
                    id={button.id}
                    value={button.id}
                    label={button.label}
                    name="paymentMethod"
                    boolean={button.id === reason}
                  />
                </li>
              )}
            />
          </div>
        )}
        <div className="bottom-buttons">
          <Button
            className={`${pressedSubmit && 'blocked'}`}
            type="submit"
          >
            Confirm
          </Button>
          <Button
            onClick={close}
          >
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default RequestCancellationModal;
