import React, { useState } from 'react';
import LabeledInput from '../LabeledInput';
import LabeledRadioButton from '../LabeledRadioButton';
import List from '../List';

interface PaymentFieldsProps {
  pressedSubmit: boolean;
  setPressedSubmit: (bool: boolean) => void;
}

function PaymentFields({
  pressedSubmit,
  setPressedSubmit,
}: PaymentFieldsProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cvc, setCVC] = useState<string>('');
  const radioButtons = [
    {
      label: 'Credit/debit card',
      onClick: () => setPaymentMethod('creditDebit'),
      id: 'creditDebit',
    },
    {
      label: 'PayPal',
      onClick: () => setPaymentMethod('paypal'),
      id: 'paypal',
    },
    {
      label: 'Google Pay',
      onClick: () => setPaymentMethod('googlePay'),
      id: 'googlePay',
    },
    {
      label: 'Crypto',
      onClick: () => setPaymentMethod('crypto'),
      id: 'crypto',
    },
  ];
  return (
    <div className="payment-fields section">
      <h2>
        Payment
      </h2>
      <List
        className="radio-button-ul"
        items={radioButtons}
        renderAs={((button) => (
          <li key={button.label}>
            <LabeledRadioButton
              onClick={button.onClick}
              id={button.id}
              value={button.id}
              label={button.label}
              name="paymentMethod"
              boolean={button.id === paymentMethod}
              className={`${button.id === paymentMethod && 'selected'}`}
              warnCondition={pressedSubmit && !paymentMethod}
              pressedSubmit={pressedSubmit}
              setPressedSubmit={setPressedSubmit}
              selectedValue={paymentMethod}
            />
          </li>
        ))}
      />
      <div className={`fields ${!paymentMethod ? 'blocked' : ''}`}>
        <LabeledInput
          input={nameOnCard}
          setInput={setNameOnCard}
          name="nameOnCard"
          labelSubscript="Required"
          placeholder="Your full name"
          label="Name on card"
          id="nameOnCard"
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
        />
        <LabeledInput
          input={cardNumber}
          setInput={setCardNumber}
          name="cardNumber"
          labelSubscript="Required"
          placeholder="Card number"
          label="Card Number"
          id="cardNumber"
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
        />
        <LabeledInput
          input={expirationDate}
          setInput={setExpirationDate}
          name="expirationDate"
          labelSubscript="Required"
          placeholder="Card expiration date"
          label="Expiration Date"
          id="expirationDate"
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
        />
        <LabeledInput
          input={cvc}
          setInput={setCVC}
          name="cvc"
          labelSubscript="Required"
          placeholder="Card CVC"
          label="CVC"
          id="cvc"
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
        />
      </div>
    </div>
  );
}

export default PaymentFields;
