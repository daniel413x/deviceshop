import React, { useContext, useState } from 'react';
import { ISpecification } from '../../../../types/types';
import Input from '../../../Input';
import Context from '../../../../context/context';

interface SpecificationProps {
  specification: Omit<ISpecification, 'typeId' | 'shopProductId'>;
}

export function Specification({
  specification,
}: SpecificationProps) {
  const {
    id,
  } = specification;
  const {
    createProductPage,
  } = useContext(Context);
  const [key, setKey] = useState<string>(specification.key);
  const [value, setValue] = useState<string>(specification.value);
  const handleSetKey = (e: string) => {
    createProductPage.updateSpec(id, 'key', e);
    setKey(e);
  };
  const handleSetValue = (e: string) => {
    createProductPage.updateSpec(id, 'value', e);
    setValue(e);
  };
  return (
    <div className="specification">
      <Input
        input={key}
        setInput={handleSetKey}
        inputStyle="matchSpan"
        className="key"
      />
      <Input
        input={value}
        setInput={handleSetValue}
        inputStyle="matchSpan"
        className="value"
      />
    </div>
  );
}

export default Specification;
