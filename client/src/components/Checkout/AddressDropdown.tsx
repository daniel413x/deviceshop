import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/context';
import { fetchAddresses } from '../../http/addressInAddressBookAPI';
import { IAddressInAddressBook } from '../../types/types';
import Dropdown from '../Dropdown';

interface AddressDropdownProps {
  setAddress: (address: IAddressInAddressBook) => void;
}

function AddressDropdown({
  setAddress,
}: AddressDropdownProps) {
  const {
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
      user.setAddresses(fetchedAddresses.rows);
      fetchedAddresses.rows.forEach((address) => {
        if (address.default) {
          selectAddress(address);
        }
      });
    })();
  }, []);
  const dropdownButtons = user.addresses.map((address) => ({
    callback: () => selectAddress(address),
    label: address.addressLineOne,
  }));
  return (
    <Dropdown
      className={`address-dropdown ${user.addresses.length === 0 && 'blocked'}`}
      label={selectedAddress || 'Saved addresses'}
      dropdownIcon="triangle"
      to={dropdownButtons}
    />
  );
}

export default observer(AddressDropdown);
