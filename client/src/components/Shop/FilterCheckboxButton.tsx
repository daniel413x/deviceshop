import React, {
  useContext,
} from 'react';
import { observer } from 'mobx-react-lite';
import { SpecificationWithDeviceCount } from '../../types/types';
import Context from '../../context/context';
import LabeledCheckboxButton from '../LabeledCheckboxButton';

interface FilterCheckboxButtonProps {
  specification: SpecificationWithDeviceCount;
}

function FilterCheckboxButton({ specification }: FilterCheckboxButtonProps) {
  const {
    id,
    count,
    value,
  } = specification;
  const {
    shopPage,
  } = useContext(Context);
  const inToggleArray = shopPage.willBeToggled(id);
  const alreadyActive = shopPage.hasActiveFilter(specification);
  const toBeToggledOn = inToggleArray && !alreadyActive;
  const activeAndNotToBeToggledOff = alreadyActive && !inToggleArray;
  const checked = toBeToggledOn || activeAndNotToBeToggledOff;
  return (
    <div
      className={`labeled-checkbox-button-wrapper ${count === 0 && 'blocked'}`}
    >
      <LabeledCheckboxButton
        onClick={() => {
          shopPage.handleChangeFiltersToToggle(specification);
        }}
        label={value}
        boolean={checked}
      />
      <span className="count">
        {count}
      </span>
    </div>
  );
}

export default observer(FilterCheckboxButton);
