import React, {
  useContext, useState, FormEvent, useEffect,
} from 'react';
import Context from '../../../context/context';
import { editUser } from '../../../http/userAPI';
import { unCamelCase } from '../../../utils/functions';
import Button from '../../Button';
import CloseButton from '../../CloseButton';
import LabeledInput from '../../LabeledInput';
import Modal from '../../Modal';

interface EditFieldModalProps {
  field: string;
  previous?: string;
  close: () => void;
}

function EditFieldModal({
  close,
  field,
  previous,
}: EditFieldModalProps) {
  const {
    notifications,
    user,
  } = useContext(Context);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setPressedSubmit(true);
    try {
      const updatedUser = await editUser({ [field]: newValue });
      user.set(updatedUser);
      close();
      notifications.message(
        'Field updated',
      );
    } catch (error: any) {
      notifications.error(
        error.response.data.message,
      );
    }
  };
  const fieldReadable = unCamelCase(field);
  const password = field === 'password';
  useEffect(() => {
    if (field) {
      setPressedSubmit(false);
      setNewValue('');
    }
  }, [field]);
  return (
    <Modal
      show={field}
      close={close}
      className="edit-field"
      id="edit-field"
      size="medium"
    >
      <div className="window-header">
        <div className="left-col">
          <span className="name">
            Change field
          </span>
        </div>
        <CloseButton
          onMouseDown={close}
        />
      </div>
      <form onSubmit={submit}>
        <div className="body">
          <h2 className="header">
            Enter new value
          </h2>
          <LabeledInput
            label={fieldReadable || 'Field'}
            input={newValue}
            setInput={setNewValue}
            placeholder={previous?.toString() || 'false'}
            type={password ? 'password' : 'input'}
            id="new-value"
          />
          {password && (
          <LabeledInput
            label="Confirm password"
            input={confirmPassword}
            setInput={setConfirmPassword}
            placeholder=""
            type="password"
            id="confirm-password"
          />
          )}
        </div>
        <div className="bottom-buttons">
          <Button
            className={`submit-button ${pressedSubmit && 'blocked'} ${password && newValue !== confirmPassword && 'blocked'} ${!newValue && 'blocked'}`}
            type="submit"
          >
            Confirm
          </Button>
          <Button
            onClick={close}
          >
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}

EditFieldModal.defaultProps = {
  previous: '',
};

export default EditFieldModal;
