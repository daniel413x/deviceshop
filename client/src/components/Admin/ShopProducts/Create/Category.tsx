import React, { useContext, useEffect, useState } from 'react';
import { ISpecification } from '../../../../types/types';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import List from '../../../List';
import Button from '../../../Button';
import Input from '../../../Input';
import Context from '../../../../context/context';
import Specification from './Specification';

interface CategoryProps {
  specifications: ISpecification[];
}

function Category({
  specifications,
}: CategoryProps) {
  const [category, setCategory] = useState<string>(specifications[0].category);
  const {
    createProductPage,
  } = useContext(Context);
  const handleSetCategory = (e: string) => {
    createProductPage.updateCategory(category, e);
    setCategory(e);
  };
  useEffect(() => {
    setCategory(specifications[0].category);
  }, [specifications]);
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
          onClick={() => createProductPage.deleteCategory(category)}
          className="delete-category-button delete-button"
        >
          <CloseIcon />
        </Button>
      </div>
      <List
        items={specifications}
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
