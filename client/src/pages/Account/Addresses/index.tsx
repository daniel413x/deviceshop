import React, { FormEvent, useContext, useState } from 'react';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import PageHeader from '../../../components/PageHeader';
import AccountSideCol from '../../../components/Account/AccountSideCol';
import Context from '../../../context/context';
import AddressForm from '../../../components/AddressForm';
import BorderButtonsRow from '../../../components/BorderButtonsRow';
import Button from '../../../components/Button';
import { QueryReqCreateAddress } from '../../../types/types';
import { createAddress, editAddress } from '../../../http/addressInAddressBookAPI';
import DeleteAddresses from '../../../components/Account/Addresses/DeleteAddresses';

function Addresses() {
  const {
    addresses,
    user,
    notifications,
  } = useContext(Context);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<string>('');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPressedSubmit(true);
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    const formFields = Object.fromEntries(formData.entries());
    const {
      firstName,
      lastName,
      addressLineOne,
      city,
      state,
      zip,
      id,
      makeDefault,
      company,
    } = formFields as { [key: string]: string };
    if (!firstName || !lastName || !addressLineOne || !city || !state || !zip) {
      notifications.neutral(
        'Please complete all required fields',
      );
      return;
    }
    const form: QueryReqCreateAddress = {
      firstName,
      lastName,
      addressLineOne,
      city,
      state,
      zip,
      isDefault: makeDefault as unknown as boolean || false,
      userId: user.id,
      company: company || undefined,
    };
    try {
      if (formMode === 'edit') {
        await editAddress(id, form);
        addresses.updateAddress(id, form);
        notifications.message(
          'Address updated',
        );
      } else {
        const newAddress = await createAddress(form);
        addresses.addAddress(newAddress);
        setSuccess(true);
        notifications.message(
          'Address saved to address book',
        );
      }
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    } finally {
      setTimeout(() => setSuccess(false), 0);
    }
  };
  const showSubmitButton = formMode === 'edit' || formMode === 'add';
  return (
    <div id="addresses">
      <div className="columned-page">
        <AccountSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Your address book"
          />
          <BorderButtonsRow>
            <Button
              buttonStyle="blank"
              className={`blank ${formMode === 'add' && 'selected'}`}
              onClick={() => setFormMode('add')}
            >
              Add an address
            </Button>
            <Button
              buttonStyle="blank"
              className={`blank ${formMode === 'edit' && 'selected'}`}
              onClick={() => setFormMode('edit')}
            >
              Edit an address
            </Button>
            <Button
              buttonStyle="blank"
              className={`blank ${formMode === 'delete' && 'selected'}`}
              onClick={() => setFormMode('delete')}
            >
              Delete an address
            </Button>
          </BorderButtonsRow>
          <form className="checkout-style" onSubmit={submit}>
            {formMode === 'edit' && (
            <AddressForm
              pressedSubmit={pressedSubmit}
              setPressedSubmit={setPressedSubmit}
              defaultCheckbox
              selectDropdown
            />
            )}
            {formMode === 'add' && (
            <AddressForm
              pressedSubmit={pressedSubmit}
              setPressedSubmit={setPressedSubmit}
              buttonsRow
              defaultCheckbox
              clearForm={success}
            />
            )}
            {formMode === 'delete' && (
            <DeleteAddresses />
            )}
            {showSubmitButton && (
            <Button
              className="submit-button"
              type="submit"
            >
              Submit
            </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
