import React, {
  useContext, useState, FormEvent,
} from 'react';
import Context from '../../../context/context';
import { editUser } from '../../../http/userAPI';
import { ReactComponent as PlainCheck } from '../../../assets/icons/PlainCheck.svg';
import Button from '../../Button';
import CloseButton from '../../CloseButton';
import Modal from '../../Modal';
import UploadedImage from './UploadedImage';

interface EditFieldModalProps {
  show: boolean;
  close: () => void;
}

function EditFieldModal({
  close,
  show,
}: EditFieldModalProps) {
  const { notifications, user } = useContext(Context);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setPressedSubmit(true);
      const formData = new FormData(e.currentTarget);
      const { avatar } = await editUser(formData);
      user.setAvatar(avatar);
      setSuccess(true);
    } catch (error: any) {
      notifications.error(
        `${error.response.data.message}`,
      );
    } finally {
      setPressedSubmit(false);
    }
  };
  const unblock = () => {
    setSuccess(false);
    setPressedSubmit(false);
  };
  return (
    <Modal
      show={show}
      close={close}
      className="edit-avatar"
      id="edit-avatar"
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
          <UploadedImage
            name="avatar"
            initialImage={user.avatar ? `${process.env.REACT_APP_API_URL}${user.avatar}` : ''}
            onChangeWith={() => unblock()}
          />
        </div>
        <div className="bottom-buttons">
          <Button
            className={`submit-button ${(pressedSubmit || success) && 'blocked'}`}
            id="edit-avatar-save-button"
            type="submit"
          >
            {(success) && <PlainCheck />}
            {`${(success) ? 'Your avatar was changed' : 'Save'}`}
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

export default EditFieldModal;
