import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Context from '../../../../context/context';
import { convertPriceInt, formatPrice } from '../../../../utils/functions';
import EditableField from '../../../EditableField';

function PriceTags() {
  const {
    createProductPage,
  } = useContext(Context);
  const discountToDecimal = convertPriceInt(createProductPage.discount);
  const formattedRenderedPrice = formatPrice(Number(createProductPage.price), discountToDecimal);
  return (
    <div className="price-tags">
      <span className="undiscounted-price">
        $
        <EditableField
          name="price"
          id="pricePrieview"
          outsideInput={createProductPage.price.toString()}
          // eslint-disable-next-line react/jsx-no-bind
          setOutsideInput={createProductPage.setPrice.bind(createProductPage)}
        />
      </span>
      <span className="discounted-price">
        $
        {formattedRenderedPrice}
      </span>
    </div>
  );
}

PriceTags.defaultProps = {
  discount: '',
};

export default observer(PriceTags);
