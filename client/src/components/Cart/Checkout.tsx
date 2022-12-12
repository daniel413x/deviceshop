import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import Context from '../../context/context';
import { CHECKOUT_ROUTE, REGISTER_ROUTE } from '../../utils/consts';
import Button from '../Button';
import NavButton from '../NavButton';

function Checkout() {
  const navigate = useNavigate();
  const {
    cart,
    user,
  } = useContext(Context);
  const total = cart.getFormattedTotal();
  const requestLogin = () => {
    user.setLoginToCheckout(true);
    navigate(`/${REGISTER_ROUTE}`);
  };
  return (
    <div className="checkout">
      Total
      <div className="divider" />
      $
      {total}
      {user.isGuest ? (
        <Button className="checkout-link" buttonStyle={['match-navlink', 'secondary']} onClick={requestLogin}>
          &#8594;
          Checkout
        </Button>
      )
        : (
          <NavButton className="checkout-link" buttonStyle={['match-button', 'secondary']} to={CHECKOUT_ROUTE}>
            &#8594;
            Checkout
          </NavButton>
        )}
    </div>
  );
}

export default Checkout;
