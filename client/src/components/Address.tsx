import React from 'react';
import { IAddress } from '../types/types';

interface AddressProps {
  address: IAddress;
  email?: string;
}

function Address({
  address,
  email,
}: AddressProps) {
  const {
    firstName,
    lastName,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    zip,
  } = address;
  return (
    <div className="address">
      <span className="name">
        {`${firstName} ${lastName}`}
      </span>
      <span className="address-line">
        {`${addressLineOne} ${addressLineTwo || ''} ${city}, ${state} ${zip}`}
      </span>
      <span className="country-line">
        United States
      </span>
      {email && (
        <span className="email">
          {`${email}`}
        </span>
      )}
    </div>
  );
}

Address.defaultProps = {
  email: '',
};

export default Address;
