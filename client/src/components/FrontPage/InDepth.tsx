import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import { IShopProduct, ISpecification } from '../../types/types';
import { fetchProducts } from '../../http/shopProductAPI';
import {
  findSpecifications,
  makeSlug,
  randomInt,
} from '../../utils/functions';
import Context from '../../context/context';
import {
  ASPECT_RATIO,
  CAPACITY,
  DISPLAY_SIZE,
  FRONT,
  MEMORY,
  OPERATING_SYSTEM,
  REAR,
  RESOLUTION,
  SHOP_ROUTE,
} from '../../utils/consts';
import List from '../List';

interface SpecificationProps {
  specification: ISpecification;
}

function Specification({ specification }: SpecificationProps) {
  let renderedKey: string = specification.key;
  if (specification.key === OPERATING_SYSTEM) {
    renderedKey = 'OS';
  }
  if (specification.key === CAPACITY) {
    renderedKey = 'Battery capacity';
  }
  if (specification.key === REAR) {
    renderedKey = 'Rear camera';
  }
  if (specification.key === FRONT) {
    renderedKey = 'Front camera';
  }
  return (
    <div className="specification">
      <span className="key">
        {renderedKey}
      </span>
      <div className="ellipses" />
      <span className="value">
        {specification.value}
      </span>
    </div>
  );
}

interface ProductColProps {
  product: IShopProduct;
  className?: string;
}

function ProductCol({
  product,
  className,
}: ProductColProps) {
  const { name } = product;
  const specifications = findSpecifications([
    MEMORY,
    CAPACITY,
    OPERATING_SYSTEM,
    DISPLAY_SIZE,
    RESOLUTION,
    FRONT,
    REAR,
    ASPECT_RATIO,
  ], product.specifications);
  const slug = makeSlug(name);
  return (
    <div className={`product ${className}`}>
      <div className="image-col">
        <img
          src={`${process.env.REACT_APP_API_URL}${product.thumbnail}`}
          alt="Product in-depth"
        />
        <span className="name">
          {name}
        </span>
      </div>
      <div className="specifications">
        <span className="label">
          Key specifications
        </span>
        <List
          className="list"
          items={specifications}
          renderAs={((specification) => (
            <li key={specification.id}>
              <Specification
                specification={specification}
              />
            </li>
          ))}
        />
        <NavLink
          to={`${SHOP_ROUTE}/${slug}`}
          className="shop-now"
        >
          Shop now
        </NavLink>
      </div>
    </div>
  );
}

ProductCol.defaultProps = {
  className: '',
};

function InDepth() {
  const { types } = useContext(Context);
  const [firstItem, setFirstItem] = useState<IShopProduct>();
  const [secondItem, setSecondItem] = useState<IShopProduct>();
  const smartphones = types.findType('Smartphone');
  useEffect(() => {
    (async () => {
      if (smartphones) {
        const products = await fetchProducts({
          limit: 5,
          where: {
            typeId: smartphones.id,
          },
        });
        const firstItemIndex = randomInt(0, 4);
        let secondItemIndex;
        if (firstItemIndex === 4) {
          secondItemIndex = 3;
        } else if (firstItemIndex === 0) {
          secondItemIndex = 1;
        } else {
          secondItemIndex = firstItemIndex + 1;
        }
        setFirstItem(products.rows[firstItemIndex]);
        setSecondItem(products.rows[secondItemIndex]);
      }
    })();
  }, []);
  return (
    <div className="in-depth">
      <SectionHeader
        header="In depth"
      />
      <div className="row">
        {firstItem && (
        <ProductCol
          product={firstItem}
          className="left"
        />
        )}
        {secondItem && (
        <ProductCol
          product={secondItem}
          className="right"
        />
        )}
      </div>
    </div>
  );
}

export default InDepth;
