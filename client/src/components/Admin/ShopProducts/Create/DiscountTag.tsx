import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../../../Button';
import EditableField from '../../../EditableField';
import { ReactComponent as EditIcon } from '../../../../assets/icons/Edit.svg';
import { selectEnd } from '../../../../utils/functions';
import Context from '../../../../context/context';

function DiscountTag() {
  const {
    createProductPage,
  } = useContext(Context);
  const focusField = () => {
    const focusedField = document.getElementById('discountPreview');
    focusedField?.focus();
    selectEnd(focusedField);
  };
  return (
    <div className="discount-tag-wrapper">
      <span
        className="discount-tag"
      >
        -
        <EditableField
          outsideInput={createProductPage.discount.toString()}
          // eslint-disable-next-line react/jsx-no-bind
          setOutsideInput={createProductPage.setDiscount.bind(createProductPage)}
          name="discount"
          id="discountPreview"
          noFocusButton
        />
        %
      </span>
      <Button
        buttonStyle="blank"
        onClick={focusField}
      >
        <EditIcon />
      </Button>
    </div>
  );
}

export default observer(DiscountTag);
