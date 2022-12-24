import React, { useEffect, useState } from 'react';
import { IAddressInAddressBook } from '../types/types';
import LabeledInput from './LabeledInput';
import AddressDropdown from './AddressDropdown';
import BorderButtonsRow from './BorderButtonsRow';
import Button from './Button';
import LabeledCheckboxButton from './LabeledCheckboxButton';

interface AddressFormProps {
  pressedSubmit: boolean;
  clearForm?: boolean;
  setPressedSubmit: (bool: boolean) => void;
  className?: string;
  selectDropdown?: boolean;
  buttonsRow?: boolean;
  defaultCheckbox?: boolean;
}

function AddressForm({
  pressedSubmit,
  setPressedSubmit,
  className,
  selectDropdown,
  buttonsRow,
  clearForm,
  defaultCheckbox,
}: AddressFormProps) {
  const [company, setCompany] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [addressLineOne, setAddressLineOne] = useState<string>('');
  const [addressLineTwo, setAddressLineTwo] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [makeDefault, setMakeDefault] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [forCompanyAddress, setForCompanyAddress] = useState<boolean>(false);
  const setAddress = (address: IAddressInAddressBook | '') => {
    if (!address) {
      if (company) {
        setCompany('');
      }
      setFirstName('');
      setLastName('');
      setAddressLineOne('');
      setAddressLineTwo('');
      setCity('');
      setState('');
      setZip('');
      setId('');
      setMakeDefault(false);
    } else {
      if (address.company) {
        setCompany(address.company || '');
      }
      if (address.isDefault) {
        setMakeDefault(address.isDefault);
      } else {
        setMakeDefault(false);
      }
      setFirstName(address.firstName);
      setLastName(address.lastName);
      setAddressLineOne(address.addressLineOne);
      setAddressLineTwo(address.addressLineTwo || '');
      setCity(address.city);
      setState(address.state);
      setZip(address.zip);
      setId(address.id);
    }
  };
  useEffect(() => {
    if (clearForm) {
      setAddress('');
    }
  }, [clearForm]);
  useEffect(() => {
    if (!forCompanyAddress) {
      setCompany('');
    }
  }, [forCompanyAddress]);
  return (
    <div className={`address-form section ${className}`}>
      <div className="top-buttons">
        {buttonsRow && (
        <BorderButtonsRow>
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
        </BorderButtonsRow>
        )}
        {selectDropdown && (
        <AddressDropdown
          setAddress={setAddress}
        />
        )}
      </div>
      {(forCompanyAddress || company) && (
        <LabeledInput
          input={company}
          setInput={setCompany}
          name="company"
          labelSubscript="Required"
          placeholder="Your company's name"
          label="Company name"
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
      {defaultCheckbox && (
        <LabeledCheckboxButton
          label="Make this my default shipping address"
          boolean={makeDefault}
          onClick={() => setMakeDefault(!makeDefault)}
          value={makeDefault}
          name="makeDefault"
          id="makeDefault"
          className="default-checkbox"
        />
      )}
      {/* for AddressInAddressBook PUT */}
      <input
        type="hidden"
        name="id"
        value={id}
      />
    </div>
  );
}

AddressForm.defaultProps = {
  className: '',
  selectDropdown: false,
  buttonsRow: false,
  clearForm: false,
  defaultCheckbox: false,
};

export default AddressForm;
