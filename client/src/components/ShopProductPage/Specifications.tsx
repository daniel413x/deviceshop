import React from 'react';
import { ISpecification } from '../../types/types';
import { categorizeSpecifications } from '../../utils/functions';
import List from '../List';

interface SpecificationsRowProps {
  specifications: ISpecification[];
}

function SpecificationRows({
  specifications,
}: SpecificationsRowProps) {
  const { category } = specifications[0];
  return (
    <div className="specification-row">
      <h5 className="category">
        {category}
      </h5>
      <List
        items={specifications}
        className="pairs-ul"
        renderAs={((spec) => (
          <li key={spec.id}>
            <div className="pair">
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
        className="specification-rows-ul"
        renderAs={((specs, i) => (
          <li key={i}>
            <SpecificationRows
              specifications={specs}
            />
          </li>
        ))}
      />
    </div>
  );
}

export default Specifications;
