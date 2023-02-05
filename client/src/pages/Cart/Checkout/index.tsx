import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ShopSideCol from '../../../components/ShopSideCol';
import BreadcrumbTrail from '../../../components/BreadcrumbTrail';
import PageHeader from '../../../components/PageHeader';
import Context from '../../../context/context';
import NavButton from '../../../components/NavButton';
import { CART_ROUTE } from '../../../utils/consts';
import Form from '../../../components/Checkout/Form';
import { IOrderedProduct } from '../../../types/types';
import OrderItems from '../../../components/OrderItems';

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
  return (
    <div id="checkout">
      {auth && (
      <div className="columned-page">
        <ShopSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Checkout"
            noDiv
            noEllipses
          />
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
        </div>
      </div>
      )}
    </div>
  );
}

export default Checkout;
