import React, { useContext, useState } from 'react';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import PageHeader from '../../../components/PageHeader';
import AccountSideCol from '../../../components/Account/AccountSideCol';
import EditFieldModal from '../../../components/Account/Credentials/EditFieldModal';
import Context from '../../../context/context';
import List from '../../../components/List';
import Field from '../../../components/Account/Credentials/Field';

function Credentials() {
  const {
    user,
  } = useContext(Context);
  const [editedField, setEditedField] = useState<string>('');
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
      <div className="columned-page">
        <AccountSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Your account details"
          />
          <List
            className="field-ul"
            items={boxes}
            renderAs={((box) => (
              <li key={box.field}>
                <Field
                  field={box.field}
                  value={box.value}
                  openEditFieldModal={() => openEditFieldModal(box.field, box.value)}
                />
              </li>
            ))}
          />
        </div>
      </div>
    </div>
  );
}

export default Credentials;
