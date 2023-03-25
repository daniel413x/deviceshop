import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import Context from '../../../../context/context';
import { ADMIN_ROUTE, SHOP_ROUTE } from '../../../../utils/consts';
import { makeSlug } from '../../../../utils/functions';
import Button from '../../../Button';
import CloseButton from '../../../CloseButton';
import Modal from '../../../Modal';

interface CreationSuccessModalProps {
  show: boolean;
  close: () => void;
}

function CreationSuccessModal({
  show,
  close,
}: CreationSuccessModalProps) {
  const {
    createProductPage,
  } = useContext(Context);
  const navigate = useNavigate();
  const navToPage = () => {
    close();
    navigate(`/${SHOP_ROUTE}/${makeSlug(createProductPage.name)}`);
  };
  const navToAdmin = () => {
    close();
    navigate(`/${ADMIN_ROUTE}`);
  };
  return (
    <Modal
      show={show}
      close={close}
      className="creation-success-modal"
      id="creation-success-modal"
      size="medium"
    >
      <div className="window-header">
        <div className="left-col">
          Shop product created
        </div>
        <CloseButton
          onMouseDown={close}
        />
      </div>
      <div className="body">
        {createProductPage.id && (
          <img
            src={`${process.env.REACT_APP_API_URL}${createProductPage.images[0]}`}
            alt="Newly created product"
          />
        )}
        <span>
          {createProductPage.name}
        </span>
      </div>
      <div className="bottom-buttons">
        <Button
          onClick={navToPage}
          className="nav-to-page-button"
        >
          Nav to page
        </Button>
        <Button
          onClick={navToAdmin}
        >
          Return to admin
        </Button>
      </div>
    </Modal>
  );
}

export default CreationSuccessModal;
