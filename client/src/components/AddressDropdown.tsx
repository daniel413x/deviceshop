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
    notifications,
  } = useContext(Context);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const selectAddress = (address: IAddressInAddressBook) => {
    setAddress(address);
    setSelectedAddress(address.id);
  };
  useEffect(() => {
    (async () => {
      try {
        const fetchedAddresses = await fetchAddresses({ where: { userId: user.id } });
        addresses.setAddresses(fetchedAddresses);
        if (addresses.all.length > 0) {
          addresses.all.forEach((address) => {
            if (address.isDefault) {
              selectAddress(address);
            }
          });
        }
      } catch (error: any) {
        notifications.message(
          `${error.response.data.message}`,
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const dropdownButtons = addresses.all.map((address) => ({
    callback: () => selectAddress(address),
    label: address.addressLineOne,
  }));
  return (
    <Dropdown
      className={`address-dropdown ${addresses.all.length === 0 && 'blocked'} ${loading && 'loading'}`}
      label={addresses.all.find((address) => address.id === selectedAddress)?.addressLineOne || 'Saved addresses'}
      dropdownIcon="triangle"
      to={dropdownButtons}
      tabIndex={addresses.all.length === 0 ? -1 : undefined}
    />
  );
}

export default observer(AddressDropdown);
