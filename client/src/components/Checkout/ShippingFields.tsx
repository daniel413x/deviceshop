import React, { useEffect, useState } from 'react';
import { fetchShippingMethods } from '../../http/shippingMethodAPI';
import { IAddressInAddressBook, IShippingMethod } from '../../types/types';
import Button from '../Button';
import LabeledInput from '../LabeledInput';
import List from '../List';
import AddressDropdown from './AddressDropdown';
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
  const [forCompanyAddress, setForCompanyAddress] = useState<boolean>(false);
  const [company, setCompany] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [addressLineOne, setAddressLineOne] = useState<string>('');
  const [addressLineTwo, setAddressLineTwo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const setAddress = (address: IAddressInAddressBook) => {
    if (address.company) {
      setCompany(address.company || '');
      setForCompanyAddress(true);
    } else {
      setForCompanyAddress(false);
    }
    setFirstName(address.firstName);
    setLastName(address.lastName);
    setAddressLineOne(address.addressLineOne);
    setAddressLineTwo(address.addressLineTwo || '');
    setCity(address.city);
    setState(address.state);
    setZip(address.zip);
  };
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
      <div className="address-buttons-row">
        <Button
          buttonStyle="blank"
          className={`blank ${!forCompanyAddress && 'selected'}`}
          onClick={() => setForCompanyAddress(false)}
        >
          Private address
        </Button>
        <Button
          buttonStyle="blank"
          className={`blank ${forCompanyAddress && 'selected'}`}
          onClick={() => setForCompanyAddress(true)}
        >
          Company address
        </Button>
        <AddressDropdown
          setAddress={setAddress}
        />
      </div>
      {forCompanyAddress && (
        <LabeledInput
          input={company}
          setInput={setCompany}
          name="company"
          labelSubscript="Required"
          placeholder="Your company name"
          label="Company (required)"
          id="company"
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
        />
      )}
      <LabeledInput
        input={firstName}
        setInput={setFirstName}
        name="firstName"
        label="First name"
        labelSubscript={forCompanyAddress ? 'Optional' : 'Required'}
        placeholder="Your first name"
        id="firstName"
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <LabeledInput
        input={lastName}
        setInput={setLastName}
        name="lastName"
        labelSubscript={forCompanyAddress ? 'Optional' : 'Required'}
        placeholder="Your last name"
        label="Last name"
        id="lastName"
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <LabeledInput
        input={addressLineOne}
        setInput={setAddressLineOne}
        name="addressLineOne"
        labelSubscript="Required"
        placeholder="Your street address"
        label="Address line one"
        id="addressLineOne"
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <LabeledInput
        input={addressLineTwo}
        setInput={setAddressLineTwo}
        name="addressLineTwo"
        placeholder="Apt., suite"
        label="Address line two"
        id="addressLineTwo"
      />
      <LabeledInput
        input={city}
        setInput={setCity}
        name="city"
        labelSubscript="Required"
        placeholder="Your city"
        label="City"
        id="city"
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <LabeledInput
        input={state}
        setInput={setState}
        name="state"
        labelSubscript="Required"
        placeholder="Your state"
        label="State"
        id="state"
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <LabeledInput
        input={zip}
        setInput={setZip}
        name="zip"
        labelSubscript="Required"
        placeholder="Your zip"
        label="Zip"
        id="zip"
        pressedSubmit={pressedSubmit}
        setPressedSubmit={setPressedSubmit}
      />
      <span>
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
