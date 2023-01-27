import { observer } from 'mobx-react-lite';
import React from 'react';
import { IAddon } from '../../types/types';
import { convertIntToPrice, formatPrice } from '../../utils/functions';
import Button from '../Button';
import List from '../List';

interface AddonChoiceProps {
  addon: IAddon;
  selectedAddonId?: string;
  selectAddon: (selection: IAddon) => void;
  removeAddon: () => void;
}

function AddonChoice({
  addon,
  selectedAddonId,
  selectAddon,
  removeAddon,
}: AddonChoiceProps) {
  const {
    name,
    price,
    id,
    bulletPoints,
  } = addon;
  const intToPrice = formatPrice(convertIntToPrice(price));
  const showRemoveWarrantyButton = selectedAddonId === id;
  return (
    <div className={`addon-choice ${selectedAddonId === id && 'selected'}`}>
      <div className="info-col">
        <span className="price">
          $
          {intToPrice}
        </span>
        <span className="name">
          {name}
        </span>
        {bulletPoints && (
        <List
          className="bullet-points-ul"
          items={bulletPoints}
          renderAs={(bulletPoint) => (
            <li key={bulletPoint}>
              {bulletPoint}
            </li>
          )}
        />
        )}
      </div>
      {showRemoveWarrantyButton ? (
        <Button className="remove-plan-button" buttonStyle="accent-gray" onClick={() => removeAddon()}>
          Remove plan
        </Button>
      ) : (
        <Button className="choose-plan-button" buttonStyle="accent-gray" onClick={() => selectAddon(addon)}>
          Choose plan
        </Button>
      )}
    </div>
  );
}

AddonChoice.defaultProps = {
  selectedAddonId: '',
};

export default observer(AddonChoice);
