import React, { useContext, useEffect, useState } from 'react';
import { ISpecificationCategory } from '../../../../types/types';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import List from '../../../List';
import Button from '../../../Button';
import Input from '../../../Input';
import Context from '../../../../context/context';
import Specification from './Specification';

interface CategoryProps {
  specificationCategory: ISpecificationCategory;
}

function Category({
  specificationCategory,
}: CategoryProps) {
  const [category, setCategory] = useState<string>(specificationCategory.name);
  const {
    createProductPage,
  } = useContext(Context);
  const handleSetCategory = (e: string) => {
    createProductPage.updateCategory(specificationCategory.id, e);
    setCategory(e);
  };
  useEffect(() => {
    setCategory(specificationCategory.name);
  }, [specificationCategory]);
  useEffect(() => {
    if (specificationCategory.specifications.length === 0) {
      createProductPage.deleteCategory(specificationCategory.id);
    }
  }, [specificationCategory.specifications]);
  return (
    <div className="category">
      <div className="header-row">
        <Input
          input={category}
          setInput={handleSetCategory}
          inputStyle="matchSpan"
          className="name"
        />
        <Button
          buttonStyle={['blank', 'warn']}
          onClick={() => createProductPage.deleteCategory(specificationCategory.id)}
          className="delete-category-button delete-button"
        >
          <CloseIcon />
        </Button>
      </div>
      <List
        items={specificationCategory.specifications}
        className="specifications-ul"
        renderAs={((spec) => (
          <li key={spec.id} className="specification-wrapper">
            <Specification
              specification={spec}
            />
            <Button
              buttonStyle={['blank', 'warn']}
              onClick={() => createProductPage.deleteSpec(spec.id)}
              className="delete-specification-button delete-button"
            >
              <CloseIcon />
            </Button>
          </li>
        ))}
      />
    </div>
  );
}

export default Category;
