import React from 'react';
import { ISpecificationCategory } from '../types/types';
import List from './List';

function Category({
  name,
  specifications,
}: Omit<ISpecificationCategory, 'id' | 'shopProductId'>) {
  return (
    <div className="category">
      <div className="header-row">
        <h5 className="name">
          {name}
        </h5>
      </div>
      <List
        items={specifications}
        className="specifications-ul"
        renderAs={((spec) => (
          <li key={spec.id}>
            <div className="specification">
              <span className="key">
                {spec.key}
              </span>
              <span className="value">
                {spec.value}
              </span>
            </div>
          </li>
        ))}
      />
    </div>
  );
}

interface SpecificationsProps {
  specificationCategories: ISpecificationCategory[];
}

function Specifications({
  specificationCategories,
}: SpecificationsProps) {
  return (
    <div className="specifications">
      <List
        items={specificationCategories}
        className="categories-ul"
        renderAs={((cat, i) => (
          <li key={i}>
            <Category
              specifications={cat.specifications}
              name={cat.name}
            />
          </li>
        ))}
      />
    </div>
  );
}

export default Specifications;
