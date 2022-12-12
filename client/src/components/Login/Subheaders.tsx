import React, {
  useContext,
} from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import Context from '../../context/context';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/consts';

interface SubheadersProps {
  isLogin: boolean;
}

function Subheaders({ isLogin }: SubheadersProps) {
  const {
    user,
  } = useContext(Context);
  return isLogin ? (
    <div className="subheaders">
      <h4>
        If you do not have an account, please fill out the
        {' '}
        <NavLink to={`/${REGISTER_ROUTE}`} className="switch-link">registration form</NavLink>
      </h4>
    </div>
  ) : (
    <div className="subheaders">
      {user.loginToCheckout && (
      <h4>
        To continue placing your order, please register an account
      </h4>
      )}
      <h4>
        If you already have an existing account, please
        {' '}
        <NavLink to={`/${LOGIN_ROUTE}`} className="switch-link">sign in here</NavLink>
      </h4>
    </div>
  );
}

export default observer(Subheaders);
