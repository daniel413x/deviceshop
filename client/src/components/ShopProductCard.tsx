import React from 'react';
import { NavLink } from 'react-router-dom';
import { IShopProduct } from '../types/types';
import { SHOP_ROUTE } from '../utils/consts';
import { calcPriceAfterDiscounts, makeSlug } from '../utils/functions';
import RatingStars from './RatingStars';

interface ShopProductCardProps {
  product: IShopProduct;
}

function ShopProductCard({
  product,
}: ShopProductCardProps) {
  const {
    name: productName,
    price,
    discount,
    brand: {
      name: brandName,
    },
    rating,
  } = product;
  const undiscountedPrice = calcPriceAfterDiscounts(price);
  const discountedPrice = calcPriceAfterDiscounts(price, discount);
  const slug = makeSlug(productName);
  return (
    <NavLink
      className="shop-product-card"
      to={`${SHOP_ROUTE}/${slug}`}
      title={productName}
    >
      <div className="img-wrapper">
        <img
          src={`${process.env.REACT_APP_API_URL}${product.thumbnail}`}
          alt="Shop now"
        />
        <div className="price-row">
          <span className="undiscounted-price">
            $
            {undiscountedPrice}
          </span>
          <span className="discounted-price">
            $
            {discountedPrice}
          </span>
        </div>
      </div>
      <div className="lower-col">
        <span className="name">
          {productName}
        </span>
        <div className="brand-rating-row">
          <span className="brand">
            {brandName}
          </span>
          <RatingStars
            rating={rating}
            nameForKey={productName}
          />
        </div>
      </div>
    </NavLink>
  );
}

export default ShopProductCard;
