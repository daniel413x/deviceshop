import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import PageHeader from '../../../components/PageHeader';
import AccountSideCol from '../../../components/Account/AccountSideCol';
import EditFieldModal from '../../../components/Account/Credentials/EditFieldModal';
import Context from '../../../context/context';
import List from '../../../components/List';
import Field from '../../../components/Account/Credentials/Field';
import EditAvatarModal from '../../../components/Account/Credentials/EditAvatarModal';

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
    <div id="credentials">
      <EditFieldModal
        field={editedField}
        previous={previous}
        close={closeEditFieldModal}
      />
      <EditAvatarModal
        show={showEditAvatar}
        close={() => setShowEditAvatar(false)}
      />
      <div className="columned-page">
        <AccountSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Your account details"
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
        </div>
      </div>
    </div>
  );
}

export default observer(Credentials);
