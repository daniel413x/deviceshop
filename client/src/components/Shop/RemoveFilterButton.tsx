import React, {
  useContext, useEffect, useState,
} from 'react';
import { SpecificationWithDeviceCount } from '../../types/types';
import Context from '../../context/context';
import Button from '../Button';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import useQuery from '../../hooks/useQuery';

interface RemoveFilterButtonProps {
  specification: SpecificationWithDeviceCount;
}

function RemoveFilterButton({ specification }: RemoveFilterButtonProps) {
  const [classes, setClasses] = useState<string>('');
  const {
    setSearchParams,
  } = useQuery();
  const {
    id,
    value,
    key,
  } = specification;
  const {
    shopPage,
  } = useContext(Context);
  const onClick = () => {
    setClasses('');
    const timer = setTimeout(() => {
      shopPage.removeFilter(id);
      const newSearchParams = shopPage.createSearchParamsRecordFromFilters();
      setSearchParams(newSearchParams);
    }, 220);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    setClasses('shown');
  }, []);
  return (
    <Button
      className={`remove-filter-button ${classes}`}
      onClick={onClick}
      buttonStyle="warn"
      title="Remove filter"
    >
      <div>
        <span className="key">
          {key}
        </span>
        :
        {' '}
        <span className="value">
          {value}
        </span>
      </div>
      <CloseIcon
        className="icon"
      />
    </Button>
  );
}

export default RemoveFilterButton;
