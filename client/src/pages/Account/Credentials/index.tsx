import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import EditFieldModal from '../../../components/Account/Credentials/EditFieldModal';
import Context from '../../../context/context';
import List from '../../../components/List';
import Field from '../../../components/Account/Credentials/Field';
import EditAvatarModal from '../../../components/Account/Credentials/EditAvatarModal';
import ColumnedPage from '../../../components/ColumnedPage';
import AccountSideCol from '../../../components/Account/AccountSideCol';

function Credentials() {
  const {
    user,
  } = useContext(Context);
  const [editedField, setEditedField] = useState<string>('');
  const [showEditAvatar, setShowEditAvatar] = useState<boolean>(false);
  const [previous, setPrevious] = useState<string>('');
  const openEditFieldModal = (editedFieldName: string, previousVal?: string) => {
    setEditedField(editedFieldName);
    setPrevious(previousVal || '');
  };
  const closeEditFieldModal = () => {
    setEditedField('');
    setPrevious('');
  };
  const boxes = [
    {
      field: 'avatar',
      value: user.avatar,
    },
    {
      field: 'firstName',
      value: user.firstName,
    },
    {
      field: 'lastName',
      value: user.lastName,
    },
    {
      field: 'password',
      value: '***',
    },
    {
      field: 'phoneNumber',
      value: user.phoneNumber,
    },
  ];
  return (
    <ColumnedPage
      id="credentials"
      header="Your account details"
      leftSideCol={<AccountSideCol />}

    >
      <EditFieldModal
        field={editedField}
        previous={previous}
        close={closeEditFieldModal}
      />
      <EditAvatarModal
        show={showEditAvatar}
        close={() => setShowEditAvatar(false)}
      />
      <List
        childrenBefore
        className="field-ul"
        items={boxes}
        renderAs={((box) => (
          <li key={box.field}>
            <Field
              field={box.field}
              value={box.value}
              openEditFieldModal={box.field === 'avatar' ? () => setShowEditAvatar(true) : () => openEditFieldModal(box.field, box.value)}
            />
          </li>
        ))}
      />
    </ColumnedPage>
  );
}

export default observer(Credentials);
