import React, { useContext } from 'react';
import Context from '../../context/context';
import { deleteOrderedProduct } from '../../http/orderedProductAPI';
import { IOrderedProduct } from '../../types/types';
import Button from '../Button';
import Modal from '../Modal';

interface DeleteModalProps {
  id: string;
  close: () => void;
}

function DeleteModal({
  id,
  close,
}: DeleteModalProps) {
  const { cart, user } = useContext(Context);
  const deleteItem = async () => {
    if (user.isGuest) {
      const guestItems: IOrderedProduct[] = JSON.parse(localStorage.getItem('guestItems')!);
      localStorage.setItem('guestItems', JSON.stringify(guestItems.filter((guestItem) => guestItem.id !== id)));
      close();
      cart.removeItem(id);
      return;
    }
    await deleteOrderedProduct(id);
    close();
    cart.removeItem(id);
  };
  return (
    <Modal
      show={id}
      close={close}
      className="delete-cart-item"
      id="delete-cart-item"
    >
      <span className="body">
        Delete this item from your cart?
      </span>
      <div className="bottom-buttons">
        <Button
          onClick={deleteItem}
        >
          Delete
        </Button>
        <Button
          onClick={close}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
