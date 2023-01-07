import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ReactComponent as CircleCheck } from '../../../../assets/icons/CircleCheck.svg';
import { ReactComponent as CircleWarning } from '../../../../assets/icons/CircleWarning.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/Edit.svg';
import Context from '../../../../context/context';
import { selectEnd } from '../../../../utils/functions';
import Button from '../../../Button';
import EditableField from '../../../EditableField';

function AvailabilityLabel() {
  const {
    createProductPage,
  } = useContext(Context);
  const focusField = () => {
    const focusedField = document.getElementById('stockPreview');
    focusedField?.focus();
    selectEnd(focusedField);
  };
  return (
    <div className="availability-label">
      {!createProductPage.stock && <CircleWarning className="icon" />}
      {createProductPage.stock && <CircleCheck className="icon" />}
      <span className="rating">
        <EditableField
          outsideInput={createProductPage.stock.toString()}
          // eslint-disable-next-line react/jsx-no-bind
          setOutsideInput={createProductPage.setStock.bind(createProductPage)}
          name="stock"
          id="stockPreview"
          noFocusButton
        />
        {createProductPage.stock && ' in stock'}
        {!createProductPage.stock && ' out of stock'}
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

export default observer(AvailabilityLabel);
