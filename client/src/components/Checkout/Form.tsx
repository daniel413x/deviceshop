import { observer } from 'mobx-react-lite';
import React, {
  FormEvent,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import Context from '../../context/context';
import { createOrder } from '../../http/orderAPI';
import { PaymentMethod, QueryReqCreateOrder } from '../../types/types';
import { CONFIRMATION_ROUTE } from '../../utils/consts';
import Button from '../Button';
import PaymentFields from './PaymentFields';
import ShippingFields from './ShippingFields';

function Form() {
  const {
    notifications,
    cart,
  } = useContext(Context);
  const navigate = useNavigate();
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [blockSubmit, setBlockSubmit] = useState<boolean>(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPressedSubmit(true);
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const formFields = Object.fromEntries(formData.entries());
    const {
      firstName,
      lastName,
      addressLineOne,
      city,
      state,
      zip,
      nameOnCard,
      cardNumber,
      expirationDate,
      cvc,
    } = formFields as { [key: string]: string };
    const paymentMethod = formFields.paymentMethod as PaymentMethod;
    const shippingMethod = formFields.shippingMethod as string;
    if (!nameOnCard || !cardNumber || !expirationDate || !cvc || !paymentMethod) {
      notifications.neutral(
        'Please complete all required payment fields',
      );
      return;
    }
    if (!firstName || !lastName || !addressLineOne || !city || !state || !zip || !shippingMethod) {
      notifications.neutral(
        'Please complete all required shipping fields',
      );
      return;
    }
    const total = cart.getIntTotal();
    const form: QueryReqCreateOrder = {
      address: {
        firstName,
        lastName,
        addressLineOne,
        city,
        state,
        zip,
      },
      total,
      shippingMethod,
      paymentMethod,
      payment: {
        nameOnCard,
        cardNumber,
        expirationDate,
        cvc,
      },
    };
    setBlockSubmit(true);
    try {
      const order = await createOrder(form);
      cart.setShippingMethod(undefined);
      cart.setItems([]);
      navigate(`${CONFIRMATION_ROUTE}/${order.id}`);
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    } finally {
      setBlockSubmit(false);
    }
  };
  return (
    <form className="form checkout-style" onSubmit={submit}>
      <ShippingFields
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <PaymentFields
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <Button className={`submit-button ${blockSubmit && 'blocked'}`} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default observer(Form);
