import React from 'react';
import Address from '../Address';
import { IAddress } from '../../types/types';

interface ShippingInfoProps {
  address: IAddress;
  shippingMethodName: string;
  email: string;
}

function ShippingInfo({
  address,
  shippingMethodName,
  email,
}: ShippingInfoProps) {
  return (
    <div className="shipping-info">
      <div className="label-value-col">
        <span className="label">
          Estimated delivery
        </span>
        <span className="value">
          Saturday, October 30, 2022
        </span>
      </div>
      <div className="label-value-col">
        <span className="label">
          Shipping method
        </span>
        <span className="value">
          {shippingMethodName}
        </span>
      </div>
      <div className="label-value-col">
        <span className="label">
          Shipping address
        </span>
        <span className="value">
          <Address
            address={address}
            email={email}
          />
        </span>
      </div>
    </div>
  );
}

export default ShippingInfo;
