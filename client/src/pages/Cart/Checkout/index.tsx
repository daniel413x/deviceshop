import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Context from '../../../context/context';
import NavButton from '../../../components/NavButton';
import { CART_ROUTE } from '../../../utils/consts';
import Form from '../../../components/Checkout/Form';
import { IOrderedProduct } from '../../../types/types';
import OrderItems from '../../../components/OrderItems';
import ColumnedPage from '../../../components/ColumnedPage';

function Checkout() {
  const [auth, setAuth] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    cart,
  } = useContext(Context);
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/');
      return;
    }
    setAuth(true);
  }, []);
  return !auth ? null : (
    <ColumnedPage
      id="checkout"
      header="Checkout"
      noDiv
      noEllipses
    >
      <OrderItems
        items={cart.items as IOrderedProduct[]}
      />
      <NavButton
        className="make-changes-button"
        to={`/${CART_ROUTE}`}
        buttonStyle="match-button"
      >
        &#129056; Make changes
      </NavButton>
      <Form />
    </ColumnedPage>
  );
}

export default Checkout;
