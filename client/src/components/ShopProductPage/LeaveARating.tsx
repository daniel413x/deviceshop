import React, { useEffect, useState } from 'react';
import { ReactComponent as CircleCheck } from '../../assets/icons/CircleCheck.svg';
import { IOrderedProduct } from '../../types/types';
import RefocusedElement from '../RefocusedElement';

interface LeaveARatingProps {
  orderedProduct: IOrderedProduct | undefined;
  setShowReviewModal: (bool: boolean) => void;
}

function LeaveARating({
  orderedProduct,
  setShowReviewModal,
}: LeaveARatingProps) {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (orderedProduct) {
      setShow(true);
    }
  }, [orderedProduct]);
  return (
    <div className={`leave-a-rating ${show && 'show'}`}>
      <CircleCheck
        className="star"
      />
      <span>
        You are eligible to
        <RefocusedElement>
          <button
            className="show-modal-button"
            onClick={() => setShowReviewModal(true)}
            type="button"
          >
            leave a rating
          </button>
        </RefocusedElement>
        for your purchased product!
      </span>
    </div>
  );
}

export default LeaveARating;
