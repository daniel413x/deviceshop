import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context/context';
import { IShopProduct } from '../../types/types';
import { convertPriceInt, formatPrice, listProductAttributes } from '../../utils/functions';
import SliderComponent from '../SliderComponent';
import { ReactComponent as CircleCheck } from '../../assets/icons/CircleCheck.svg';
import { ReactComponent as CircleWarning } from '../../assets/icons/CircleWarning.svg';
import { ReactComponent as ShoppingCart } from '../../assets/icons/ShoppingCart.svg';
import Button from '../Button';
import DiscountTag from '../DiscountTag';
import RatingBadge from './RatingBadge';
import { createOrderedProduct } from '../../http/orderedProductAPI';
import { gray } from '../../utils/consts';

interface TopInfoRowProps {
  product: IShopProduct;
}

function TopInfoRow({
  product,
}: TopInfoRowProps) {
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
  } = product;
  const imageUrls = images.map((string) => `${process.env.REACT_APP_API_URL}${string}`);
  const specsTeaser = listProductAttributes(specifications);
  let discountedPrice;
  let previousPrice = formatPrice(convertPriceInt(price, discount));
  if (discount) {
    previousPrice = formatPrice(convertPriceInt(price));
    discountedPrice = formatPrice(convertPriceInt(price, discount));
  }
  const addToCart = async () => {
    notifications.message(
      [`${productName}`, 'was added to your cart'],
      gray,
      3000,
      thumbnail,
    );
    return;
    const item = {
      userId,
      cartId,
      price,
      brandId,
      typeId,
      shopProductId,
    };
    const newCartItem = await createOrderedProduct(item);
    cart.addItem(newCartItem);
    // creates an OrderedProduct without an orderId, essentially a cart item
  };
  return (
    <div className="top-info-row">
      <SliderComponent
        items={imageUrls}
        instant
      />
      <div className="right-col">
        {discount && (
        <DiscountTag
          discount={discount}
        />
        )}
        {discount && (
        <span className="previous-price">
          $
          {previousPrice}
        </span>
        )}
        <span className="discounted-price">
          $
          {discountedPrice}
        </span>
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
        {stock && (
        <div className="availability-label">
          <CircleCheck className="icon" />
          <span className="rating">
            {`${stock} in stock`}
          </span>
        </div>
        )}
        {!stock && (
        <div className="availability-label">
          <CircleWarning className="icon" />
          <span className="rating">
            out of stock
          </span>
        </div>
        )}
        <Button
          className="add-to-cart"
          onClick={addToCart}
        >
          <ShoppingCart />
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default observer(TopInfoRow);
