import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context/context';
import { IShopProduct } from '../../types/types';
import { listProductAttributes } from '../../utils/functions';
import SliderComponent from '../SliderComponent';
import Button from '../Button';
import DiscountTag from '../DiscountTag';
import RatingBadge from './RatingBadge';
import { createOrderedProduct } from '../../http/orderedProductAPI';
import { gray } from '../../utils/consts';
import PriceTags from '../PriceTags';
import AvailabilityLabel from './AvailabilityLabel';

interface TopInfoRowProps {
  product: IShopProduct;
}

function TopInfoRow({
  product,
}: TopInfoRowProps) {
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const { user, cart, notifications } = useContext(Context);
  const {
    id: userId,
  } = user;
  const {
    id: cartId,
  } = cart;
  const {
    name: productName,
    price,
    discount,
    brand: {
      id: brandId,
    },
    type: {
      id: typeId,
    },
    reviews,
    specifications,
    id: shopProductId,
    images,
    rating,
    stock,
    thumbnail,
    discountedPrice,
  } = product;
  const imageUrls = images.map((string) => `${process.env.REACT_APP_API_URL}${string}`);
  const specsTeaser = listProductAttributes(specifications);
  const addToCart = async () => {
    setPressedSubmit(true);
    setTimeout(() => setPressedSubmit(false), 1500);
    if (user.isGuest) {
      const guestAddedItem = {
        id: new Date().toString(),
        shopproduct: product,
        price: discountedPrice,
        addons: [],
      };
      if (!localStorage.getItem('guestItems')) {
        const guestItems = [guestAddedItem];
        localStorage.setItem('guestItems', JSON.stringify(guestItems));
      } else {
        const guestItems = JSON.parse(localStorage.getItem('guestItems')!);
        guestItems.push(guestAddedItem);
        localStorage.setItem('guestItems', JSON.stringify(guestItems));
      }
      cart.addItem(guestAddedItem);
      notifications.message(
        [`${productName}`, 'was added to your cart'],
        gray,
        3000,
        thumbnail,
      );
      return;
    }
    try {
      const item = {
        userId,
        cartId,
        price: discountedPrice,
        brandId,
        typeId,
        shopProductId,
      };
      const newCartItem = await createOrderedProduct(item);
      // creates an OrderedProduct without an orderId, essentially a cart item
      cart.addItem(newCartItem);
      notifications.message(
        [`${productName}`, 'was added to your cart'],
        gray,
        3000,
        thumbnail,
      );
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    }
  };
  return (
    <div className="top-info-row">
      <SliderComponent
        propImages={imageUrls}
        instant
      />
      <div className="right-col">
        {discount && (
        <DiscountTag
          discount={discount}
        />
        )}
        <PriceTags
          price={price}
          discount={discount}
        />
        <span className="name">
          {productName}
        </span>
        <span className="specs-teaser">
          {specsTeaser}
        </span>
        <RatingBadge
          rating={rating}
          reviewsLength={reviews.length}
        />
        <AvailabilityLabel
          stock={stock}
        />
        <Button
          className={`add-to-cart ${pressedSubmit && 'blocked'}`}
          onClick={addToCart}
          buttonStyle="secondary"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default observer(TopInfoRow);
