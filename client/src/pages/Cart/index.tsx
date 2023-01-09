import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import PageHeader from '../../components/PageHeader';
import ShopSideCol from '../../components/ShopSideCol';
import List from '../../components/List';
import Context from '../../context/context';
import CartItem from '../../components/Cart/CartItem';
import RecentlyViewedProducts from '../../components/RecentlyViewedProducts';
import AddonModal from '../../components/Cart/AddonModal';
import { IGuestAddedProduct, IOrderedProduct } from '../../types/types';
import useBreakpoints from '../../hooks/useBreakpoints';
import Checkout from '../../components/Cart/Checkout';
import ChatNow from '../../components/ChatNow';
import ConfirmationModal from '../../components/ConfirmationModal';
import { deleteOrderedProduct } from '../../http/orderedProductAPI';

function Cart() {
  const [deletedId, setDeletedId] = useState<string>('');
  const [warrantyCartItem, setWarrantyCartItem] = useState<IOrderedProduct | IGuestAddedProduct>();
  const [insuranceCartItem, setInsuranceCartItem] = useState<IOrderedProduct | IGuestAddedProduct>();
  const {
    cart,
    user,
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
  const deleteItem = async (id: string) => {
    if (user.isGuest) {
      const guestItems: IOrderedProduct[] = JSON.parse(localStorage.getItem('guestItems')!);
      localStorage.setItem('guestItems', JSON.stringify(guestItems.filter((guestItem) => guestItem.id !== id)));
      cart.removeItem(id);
      return;
    }
    await deleteOrderedProduct(id);
    cart.removeItem(id);
  };
  return (
    <div id="cart">
      <div className="columned-page">
        <ConfirmationModal
          show={deletedId}
          close={() => setDeletedId('')}
          callback={() => deleteItem(deletedId)}
          prompt="Delete this item from your cart?"
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
        <ShopSideCol />
        <div className="main-col">
          <BreadcrumbTrail />
          <PageHeader
            header="Cart"
          />
          <List
            className="cart-items-ul"
            items={cart.items}
            renderAs={(orderedProduct) => (
              <li key={orderedProduct.id}>
                <CartItem
                  orderedProduct={orderedProduct}
                  openDeleteModal={() => openDeleteModal(orderedProduct.id)}
                  openWarrantyModal={() => openWarrantyModal(orderedProduct)}
                  openInsuranceModal={() => openInsuranceModal(orderedProduct)}
                />
              </li>
            )}
          />
          {!checkoutBreakpoint && <Checkout />}
          {cart.items.length === 0 && (
            <span className="empty-cart">
              Your cart is empty
            </span>
          )}
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
