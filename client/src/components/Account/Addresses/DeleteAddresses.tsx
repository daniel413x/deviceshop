import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../../context/context';
import { deleteAddress, fetchAddresses } from '../../../http/addressInAddressBookAPI';
import Button from '../../Button';
import ConfirmationModal from '../../ConfirmationModal';
import { ReactComponent as TrashIcon } from '../../../assets/icons/Trash.svg';
import List from '../../List';

function DeleteAddresses() {
  const {
    user,
    addresses,
    notifications,
  } = useContext(Context);
  const [deletedId, setDeletedId] = useState<string>('');
  useEffect(() => {
    (async () => {
      const fetchedAddresses = await fetchAddresses({ where: { userId: user.id } });
      addresses.setAddresses(fetchedAddresses);
    })();
  }, []);
  const execDeleteAddress = async () => {
    try {
      await deleteAddress(deletedId);
      addresses.removeAddress(deletedId);
      notifications.message(
        'Address deleted',
      );
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    }
  };
  return (

    <div className="delete-addresses">
      <ConfirmationModal
        show={deletedId}
        callback={execDeleteAddress}
        close={() => setDeletedId('')}
        promptText="Delete this address?"
      />
      <List
        className="list"
        items={addresses.all}
        renderAs={((address) => (
          <li key={address.id}>
            <Button
              onClick={() => setDeletedId(address.id)}
              buttonStyle="warn"
              className="delete-button"
            >
              <TrashIcon />
              {address.addressLineOne}
            </Button>
          </li>
        ))}
      />
    </div>
  );
}

export default observer(DeleteAddresses);
