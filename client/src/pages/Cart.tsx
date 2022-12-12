import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BreadcrumbTrail from '../components/BreadcrumbTrail';
import { ReactComponent as Ellipses } from '../assets/icons/Ellipses.svg';
import PageHeader from '../components/PageHeader';
import SideCol from '../components/SideCol';
import List from '../components/List';
import Context from '../context/context';
import CartItem from '../components/Cart/CartItem';
import RecentlyViewedProducts from '../components/RecentlyViewedProducts';
import DeleteModal from '../components/Cart/DeleteModal';
import AddonModal from '../components/Cart/AddonModal';
import { IGuestAddedProduct, IOrderedProduct } from '../types/types';
import useBreakpoints from '../hooks/useBreakpoints';
import Checkout from '../components/Cart/Checkout';
import ChatNow from '../components/ChatNow';

function Cart() {
  const [deletedId, setDeletedId] = useState<string>('');
  const [warrantyCartItem, setWarrantyCartItem] = useState<IOrderedProduct | IGuestAddedProduct>();
  const [insuranceCartItem, setInsuranceCartItem] = useState<IOrderedProduct | IGuestAddedProduct>();
  const {
    cart,
  } = useContext(Context);
  const { width } = useBreakpoints();
  const checkoutBreakpoint = width >= 1203;
  const openDeleteModal = (id: string) => {
    setDeletedId(id);
  };
  const openWarrantyModal = (item: IOrderedProduct | IGuestAddedProduct) => {
    setWarrantyCartItem(item);
  };
  const openInsuranceModal = (item: IOrderedProduct | IGuestAddedProduct) => {
    setInsuranceCartItem(item);
  };
  return (
    <div id="cart">
      <div className="columned-page">
        <DeleteModal
          id={deletedId}
          close={() => setDeletedId('')}
        />
        <AddonModal
          id={warrantyCartItem?.id as string}
          name={warrantyCartItem?.shopproduct.name as string}
          thumbnail={warrantyCartItem?.shopproduct.thumbnail as string}
          close={() => setWarrantyCartItem(undefined)}
          category="warranty"
        />
        <AddonModal
          id={insuranceCartItem?.id as string}
          name={insuranceCartItem?.shopproduct.name as string}
          thumbnail={insuranceCartItem?.shopproduct.thumbnail as string}
          close={() => setInsuranceCartItem(undefined)}
          category="insurance"
        />
        <SideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <div className="header-row">
            <PageHeader
              header="Cart"
            />
            <Ellipses />
          </div>
          <div className="divider" />
          <List
            className="cart-items-ul"
            items={cart.items}
            renderAs={(orderedProduct) => (
              <CartItem
                orderedProduct={orderedProduct}
                openDeleteModal={() => openDeleteModal(orderedProduct.id)}
                openWarrantyModal={() => openWarrantyModal(orderedProduct)}
                openInsuranceModal={() => openInsuranceModal(orderedProduct)}
              />
            )}
          >
            {!checkoutBreakpoint && <Checkout />}
          </List>
        </div>
        {checkoutBreakpoint && (
        <div className="checkout-col">
          <Checkout />
          <ChatNow />
        </div>
        )}
      </div>
      <RecentlyViewedProducts />
    </div>
  );
}

export default observer(Cart);
