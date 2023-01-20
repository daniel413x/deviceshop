import React, { FormEvent, useEffect, useState } from 'react';
import { editOrder } from '../../../http/orderAPI';
import { IOrder, OrderStatusStrings } from '../../../types/types';
import { CANCELED, DELIVERED, SHIPPED } from '../../../utils/consts';
import Button from '../../Button';
import CloseButton from '../../CloseButton';
import LabeledCheckboxButton from '../../LabeledCheckboxButton';
import Modal from '../../Modal';

interface NewStatusModalProps {
  show?: IOrder;
  close: () => void;
  orders: IOrder[];
  setOrders: (items: IOrder[]) => void;
}

function NewStatusModal({
  show,
  close,
  orders,
  setOrders,
}: NewStatusModalProps) {
  const [newStatus, setNewStatus] = useState<OrderStatusStrings[]>([]);
  const toggleStatus = (string: OrderStatusStrings) => {
    if (newStatus.indexOf(string) === -1) {
      setNewStatus([...newStatus, string]);
    } else {
      setNewStatus(newStatus.filter((statusString) => statusString !== string));
    }
  };
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const {
      id: updatedId,
    } = show!;
    await editOrder(updatedId, {
      status: newStatus,
    });
    setOrders(orders.map((order) => {
      if (order.id === updatedId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
    close();
  };
  useEffect(() => {
    if (show) {
      setNewStatus(show.status);
    }
  }, [show]);
  return (
    <Modal
      show={show}
      close={close}
      className="new-status-modal"
      id="new-status-modal"
    >
      <div className="window-header">
        <div className="left-col">
          Change status
        </div>
        <CloseButton
          onMouseDown={close}
        />
      </div>
      <form onSubmit={submit}>
        <div className="body">
          Current status: blah blah
          <ul className="checkboxes-ul">
            <li>
              <LabeledCheckboxButton
                boolean={newStatus.indexOf(SHIPPED) >= 0}
                label={SHIPPED}
                onClick={() => toggleStatus(SHIPPED)}
              />
            </li>
            <li>
              <LabeledCheckboxButton
                boolean={newStatus.indexOf(DELIVERED) >= 0}
                label={DELIVERED}
                onClick={() => toggleStatus(DELIVERED)}
              />
            </li>
            <li>
              <LabeledCheckboxButton
                boolean={newStatus.indexOf(CANCELED) >= 0}
                label={CANCELED}
                onClick={() => toggleStatus(CANCELED)}
              />
            </li>
          </ul>
        </div>
        <div className="bottom-buttons">
          <Button
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

NewStatusModal.defaultProps = {
  show: undefined,
};

export default NewStatusModal;
