import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../../../context/context';
import { listProductAttributes } from '../../../../utils/functions';
import SliderComponent from '../../../SliderComponent';
import Button from '../../../Button';
import DiscountTag from './DiscountTag';
import PriceTags from './PriceTags';
import EditableField from '../../../EditableField';
import AvailabilityLabel from './AvailabilityLabel';
import RatingBadge from '../../../ShopProductPage/RatingBadge';

const Name = observer(() => {
  const {
    createProductPage,
  } = useContext(Context);
  return (
    <span className="name">
      <EditableField
        name="name"
        id="namePreview"
        outsideInput={createProductPage.name}
        // eslint-disable-next-line react/jsx-no-bind
        setOutsideInput={createProductPage.setName.bind(createProductPage)}
      />
    </span>
  );
});

function TopInfoRow() {
  const {
    createProductPage,
  } = useContext(Context);
  const specsTeaser = listProductAttributes(createProductPage.specifications);
  return (
    <div className="top-info-row">
      <SliderComponent
        instant
        admin
      />
      <div className="right-col">
        <DiscountTag />
        <PriceTags />
        <Name />
        <span className="specs-teaser">
          {specsTeaser}
        </span>
        <RatingBadge
          rating={createProductPage.rating}
          reviewsLength={createProductPage.reviewsLength}
        />
        <AvailabilityLabel />
        <Button
          className="add-to-cart"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default observer(TopInfoRow);
