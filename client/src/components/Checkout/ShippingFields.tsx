import React, { useEffect, useState } from 'react';
import { fetchShippingMethods } from '../../http/shippingMethodAPI';
import { IShippingMethod } from '../../types/types';
import List from '../List';
import AddressForm from '../AddressForm';
import ShippingMethod from './ShippingMethod';

interface ShippingFieldsProps {
  pressedSubmit: boolean;
  setPressedSubmit: (bool: boolean) => void;
}

function ShippingFields({
  pressedSubmit,
  setPressedSubmit,
}: ShippingFieldsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<IShippingMethod>();
  const [shippingMethods, setShippingMethods] = useState<IShippingMethod[]>([]);
  useEffect(() => {
    try {
      (async () => {
        const fetchedShippingMethods = await fetchShippingMethods();
        setShippingMethods(fetchedShippingMethods.rows);
      })();
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className={`shipping-fields section ${loading}`}>
      <h2>
        Shipping
      </h2>
      <AddressForm
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
        selectDropdown
        buttonsRow
      />
      <span className="shipping-method-label">
        Shipping method
      </span>
      <List
        className="radio-button-ul"
        items={shippingMethods}
        renderAs={((shippingMethod) => (
          <li key={shippingMethod.name}>
            <ShippingMethod
              onClick={() => setSelectedShippingMethod(shippingMethod)}
              pressedSubmit={pressedSubmit}
              shippingMethod={shippingMethod}
              selectedShippingMethod={selectedShippingMethod!}
            />
          </li>
        ))}
      />
    </div>
  );
}

export default ShippingFields;
