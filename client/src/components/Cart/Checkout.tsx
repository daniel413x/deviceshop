import React, { ReactElement, useContext } from 'react';
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
  let checkoutLink: ReactElement | null = null;
  if (cart.items.length > 0) {
    if (user.isGuest) {
      checkoutLink = (
        <Button className="checkout-link" buttonStyle={['match-navlink', 'secondary']} onClick={requestLogin}>
          &#8594;
          Checkout
        </Button>
      );
    } else {
      checkoutLink = (
        <NavButton className="checkout-link" buttonStyle={['match-button', 'secondary']} to={CHECKOUT_ROUTE}>
          &#8594;
          Checkout
        </NavButton>
      );
    }
  }
  return (
    <div className="checkout">
      <div className={`total ${!checkoutLink && 'fill-margin'}`}>
        <div className="label">
          <span>
            Total
          </span>
          <span>
            {cart.items.length > 0 && ' (tax incl.)'}
          </span>
        </div>
        <div className="divider" />
        $
        {total}
      </div>
      {checkoutLink}
    </div>
  );
}

export default Checkout;
