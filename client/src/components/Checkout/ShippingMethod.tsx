import React, { useContext } from 'react';
import Context from '../../context/context';
import { IShippingMethod, QueryReqCreateShippingMethod } from '../../types/types';
import { convertPriceInt, formatPrice } from '../../utils/functions';
import LabeledRadioButton from '../LabeledRadioButton';

interface ShippingMethodProps {
  shippingMethod: IShippingMethod;
  selectedShippingMethod: IShippingMethod;
  onClick: () => void;
  pressedSubmit: boolean;
  setPressedSubmit: (bool: boolean) => void;
}

function ShippingMethod({
  shippingMethod,
  selectedShippingMethod,
  onClick,
  pressedSubmit,
  setPressedSubmit,
}: ShippingMethodProps) {
  const {
    cart,
  } = useContext(Context);
  const onClickHandler = () => {
    onClick();
    cart.setShippingMethod(shippingMethod);
  };
  const shippingMethodQueryObj: QueryReqCreateShippingMethod = {
    price: shippingMethod.price,
    name: shippingMethod.name,
  };
  const price = formatPrice(convertPriceInt(shippingMethod.price));
  return (
    <LabeledRadioButton
      onClick={onClickHandler}
      id={shippingMethod.id}
      value={JSON.stringify(shippingMethodQueryObj)}
      label={`${shippingMethod.name} ($${price})`}
      name="shippingMethod"
      boolean={selectedShippingMethod?.id === shippingMethod.id}
      className={`${selectedShippingMethod?.id === shippingMethod.id && 'selected'}`}
      warnCondition={pressedSubmit && !selectedShippingMethod}
      pressedSubmit={pressedSubmit}
      setPressedSubmit={setPressedSubmit}
      selectedValue={selectedShippingMethod}
    />
  );
}

export default ShippingMethod;
