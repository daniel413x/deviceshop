import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import Context from '../context/context';
import { ReactComponent as PlainCheck } from '../assets/icons/PlainCheck.svg';
import { ReactComponent as DeliveryIcon } from '../assets/icons/Delivery.svg';
import { createReview, updateReview } from '../http/reviewAPI';
import { IOrderedProduct, IReview, QueryReqCreateReview } from '../types/types';
import { DELIVERED } from '../utils/consts';
import Button from './Button';
import CloseButton from './CloseButton';
import LabeledInput from './LabeledInput';
import Modal from './Modal';
import RatingStars from './RatingStars';

interface ReviewModalProps {
  show: IOrderedProduct | boolean | undefined;
  close: () => void;
  orderedProduct: IOrderedProduct | undefined;
  productName: string;
  review?: IReview;
  orderStatus?: string[];
}

function ReviewModal({
  show,
  close,
  orderedProduct,
  productName,
  review,
  orderStatus,
}: ReviewModalProps) {
  const createForm = !review;
  const updateForm = review;
  const notDelivered = orderStatus?.indexOf(DELIVERED) === -1;
  const [success, setSuccess] = useState<boolean>(false);
  const [input, setInput] = useState<string>(review?.body || '');
  const [rating, setRating] = useState<number>(review?.rating || 5);
  const {
    user,
  } = useContext(Context);
  const {
    firstName,
    lastName,
    avatar,
  } = user;
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const {
      shopProductId,
      id: orderedProductId,
    } = orderedProduct!;
    const orderId = orderedProduct?.orderId!;
    const form: QueryReqCreateReview = {
      rating,
      body: input,
      shopProductId,
      orderedProductId,
      userId: user.id,
      orderId,
    };
    if (createForm) {
      createReview(form);
    } else {
      updateReview(review!.id, form);
    }
    setSuccess(true);
  };
  useEffect(() => {
    setSuccess(false);
  }, [input, rating]);
  return (
    <Modal
      show={show}
      close={close}
      className={`review-modal ${updateForm && 'update-form'} ${success && 'success'}`}
      id="review-modal"
      size="medium"
    >
      <div className="window-header">
        <div className="left-col">
          {createForm && 'Rate your purchase'}
          {updateForm && 'Change your rating'}
          {` - ${productName}`}
        </div>
        <CloseButton
          onMouseDown={close}
        />
      </div>
      {notDelivered && (
        <div className="body awaiting-delivery-message">
          <DeliveryIcon />
          We give our customers the opportunity to review their puchases as soon as they are delivered!
          <div className="bottom-buttons">
            <Button
              onClick={close}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      {!notDelivered && (
        <form className="body">
          {(createForm && success) && (
            <div className="confirmation">
              <PlainCheck />
              <span className="success-message">
                {createForm && 'Your rating was submitted. We appreciate your engagement!'}
              </span>
              <span className="labeled-input-text">
                Your rating
              </span>
              <RatingStars
                rating={rating}
                nameForKey="review"
              />
            </div>
          )}
          {(!success || updateForm) && (
          <div className="inputs">
            <div className="upper-info">
              <div className="user">
                <img
                  src={`${process.env.REACT_APP_API_URL}${avatar}`}
                  alt="User avatar"
                  className="avatar"
                />
                <span className="name">
                  {`${firstName} ${lastName}`}
                </span>
              </div>
              <div className="rating">
                <span className="label labeled-input-text">
                  Your rating
                </span>
                <RatingStars
                  rating={rating}
                  nameForKey="review"
                  setRating={setRating}
                />
              </div>
            </div>
            <LabeledInput
              textarea
              label={createForm ? '(Optional) Leave a written review' : '(Optional) Edit your review'}
              input={input}
              setInput={setInput}
            />
          </div>
          )}
          <div className="bottom-buttons">
            <Button
              onClick={submit}
              className={`submit-button ${success && 'blocked'}`}
              type="submit"
            >
              {(updateForm && success) && <PlainCheck />}
              {`${createForm || (updateForm && !success) ? 'Submit' : ''}`}
              {`${(updateForm && success) ? 'Your edits were saved' : ''}`}
            </Button>
            <Button
              onClick={close}
            >
              Close
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

ReviewModal.defaultProps = {
  review: undefined,
  orderStatus: undefined,
};

export default ReviewModal;
