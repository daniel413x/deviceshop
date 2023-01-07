import React from 'react';
import { ISpecification } from '../types/types';
import { categorizeSpecifications } from '../utils/functions';
import List from './List';

interface SpecificationsRowProps {
  specifications: ISpecification[];
}

function Category({
  specifications,
}: SpecificationsRowProps) {
  const { category } = specifications[0];
  return (
    <div className="category">
      <div className="header-row">
        <h5 className="name">
          {category}
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
  specifications: ISpecification[];
}

function Specifications({
  specifications,
}: SpecificationsProps) {
  const categorizedSpecifications = categorizeSpecifications(specifications);
  return (
    <div className="specifications">
      <List
        items={categorizedSpecifications}
        className="categories-ul"
        renderAs={((specs, i) => (
          <li key={i}>
            <Category
              specifications={specs}
            />
          </li>
        ))}
      />
    </div>
  );
}

export default Specifications;
