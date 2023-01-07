import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/context';
import { fetchAddresses } from '../http/addressInAddressBookAPI';
import { IAddressInAddressBook } from '../types/types';
import Dropdown from './Dropdown';

interface AddressDropdownProps {
  setAddress: (address: IAddressInAddressBook) => void;
}

function AddressDropdown({
  setAddress,
}: AddressDropdownProps) {
  const {
    addresses,
    user,
  } = useContext(Context);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const selectAddress = (address: IAddressInAddressBook) => {
    setAddress(address);
    setSelectedAddress(address.addressLineOne);
  };
  useEffect(() => {
    (async () => {
      const fetchedAddresses = await fetchAddresses({ where: { userId: user.id } });
      addresses.setAddresses(fetchedAddresses);
      if (addresses.all.length > 0) {
        addresses.all.forEach((address) => {
          if (address.isDefault) {
            selectAddress(address);
          }
        });
      }
    })();
  }, []);
  const dropdownButtons = addresses.all.map((address) => ({
    callback: () => selectAddress(address),
    label: address.addressLineOne,
  }));
  return (
    <Dropdown
      className={`address-dropdown ${addresses.all.length === 0 && 'blocked'}`}
      label={selectedAddress || 'Saved addresses'}
      dropdownIcon="triangle"
      to={dropdownButtons}
    />
  );
}

export default observer(AddressDropdown);