import React from 'react';
import { NavLink } from 'react-router-dom';
import { IShopProduct, SpecificationColumn } from '../types/types';
import { SHOP_ROUTE } from '../utils/consts';
import {
  listProductAttributeInColumns,
  listProductAttributes,
  makeSlug,
} from '../utils/functions';
import List from './List';
import PriceTags from './PriceTags';
import RatingStars from './RatingStars';
import ShownInView from './ShownInView';

interface ShopProductCardProps {
  product: IShopProduct;
  expanded?: boolean;
  listView?: boolean;
}

function ShopProductCard({
  product,
  expanded,
  listView,
}: ShopProductCardProps) {
  const {
    name: productName,
    price,
    discount,
    brand: {
      name: brandName,
    },
    type: {
      name: typeName,
    },
    rating,
    reviews,
    specificationsByCategory,
    id,
    thumbnail,
  } = product;
  const slug = makeSlug(productName);
  const attributes = listView ? listProductAttributeInColumns(specificationsByCategory) : listProductAttributes(specificationsByCategory);
  const showGridViewAttributes = expanded && !listView;
  const showListViewAttributes = listView;
  return (
    <NavLink
      className={`shop-product-card ${expanded && 'expanded'} ${listView && 'list-view'}`}
      to={`/${SHOP_ROUTE}/${slug}`}
      title={productName}
    >
      <ShownInView>
        <div className="img-wrapper">
          <img
            src={`${process.env.REACT_APP_API_URL}${thumbnail}`}
            alt="Shop now"
          />
          <PriceTags
            price={price}
            discount={discount}
          />
        </div>
      </ShownInView>
      <div className="lower-col">
        <span className="name">
          {productName}
        </span>
        <div className="brand-rating-row">
          {!expanded && (
          <span className="brand">
            {brandName}
          </span>
          )}
          <RatingStars
            rating={Number(rating)}
            nameForKey={productName}
          />
          {expanded && (
          <span className="review-count">
            {`(${reviews.length})`}
          </span>
          )}
        </div>
        {showGridViewAttributes && (
          <div className="attributes">
            {attributes as string}
          </div>
        )}
        {showListViewAttributes && (
          <div className="attributes">
            <List
              items={attributes as SpecificationColumn[]}
              className="attributes-column-ul"
              renderAs={((column) => (
                <li key={`${id}${column.category}`}>
                  <div>
                    <span className="label">
                      {column.category}
                    </span>
                    <List
                      items={column.values}
                      className="values-ul"
                      renderAs={((value, i) => (
                        <li key={`${id}${column.category}${value}${i}`}>
                          <span>
                            {value}
                          </span>
                        </li>
                      ))}
                    />
                  </div>
                </li>
              ))}
            />
          </div>
        )}
        {expanded && (
          <div className="type">
            {typeName}
          </div>
        )}
      </div>
    </NavLink>
  );
}

ShopProductCard.defaultProps = {
  expanded: false,
  listView: false,
};

export default ShopProductCard;
