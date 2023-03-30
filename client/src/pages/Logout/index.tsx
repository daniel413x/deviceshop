import React, {
  useEffect,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { FRONT_PAGE_ROUTE } from '../../utils/consts';

function Logout() {
  const navigate = useNavigate();
  const {
    user,
    notifications,
    cart,
  } = useContext(Context);
  useEffect(() => {
    if (user.isRegistered) {
      user.unset();
      cart.unset();
      localStorage.removeItem('registeredToken');
      notifications.neutral(
        'You logged out of your account',
      );
    }
    navigate(FRONT_PAGE_ROUTE);
  }, []);
  return (
    <div id="logout" />
  );
}

export default Logout;
