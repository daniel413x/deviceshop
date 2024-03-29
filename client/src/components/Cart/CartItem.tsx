import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IGuestAddedProduct, IOrderedProduct } from '../../types/types';
import { listProductAttributes, makeSlug } from '../../utils/functions';
import Button from '../Button';
import Context from '../../context/context';
import DiscountTag from '../DiscountTag';
import PriceTags from '../PriceTags';
import CloseButton from '../CloseButton';
import List from '../List';
import CartAddon from './CartAddon';
import { SHOP_ROUTE } from '../../utils/consts';
import RefocusedElement from '../RefocusedElement';
import { fetchSpecificationCategories } from '../../http/specificationCategoryAPI';

interface CartItemProps {
  orderedProduct: IOrderedProduct | IGuestAddedProduct;
  openDeleteModal: () => void;
  openWarrantyModal: () => void;
  openInsuranceModal: () => void;
}

function CartItem({
  orderedProduct,
  openDeleteModal,
  openWarrantyModal,
  openInsuranceModal,
}: CartItemProps) {
  const { user } = useContext(Context);
  const {
    shopproduct,
    addons,
  } = orderedProduct;
  const {
    thumbnail,
    name,
    specificationsByCategory,
    discount,
    id: shopProductId,
    price,
  } = shopproduct;
  const [loading, setLoading] = useState<boolean>(true);
  const [listedSpecifications, setListedSpecifications] = useState<string>();
  useEffect(() => {
    if (user.isGuest) {
      (async () => {
        try {
          const fetchedSpecifications = await fetchSpecificationCategories({ where: { shopProductId } });
          setListedSpecifications(listProductAttributes(fetchedSpecifications.rows));
        } finally {
          setLoading(false);
        }
      })();
    }
    setListedSpecifications(listProductAttributes(specificationsByCategory));
  }, []);
  const slug = makeSlug(name);
  let showAddonsUl = false;
  if (addons && addons.length > 0) {
    showAddonsUl = true;
  }
  const showChangeWarrantyButton = addons?.find((addon) => addon.addon.category === 'warranty');
  return (
    <div className={`cart-item ${loading && 'loading'}`}>
      <div className="row">
        <img
          className="thumbnail-col"
          src={`${process.env.REACT_APP_API_URL}${thumbnail}`}
          alt={`Thumbnail for ${name}`}
        />
        <div className="text-col">
          <div className="name-row">
            <NavLink className="name" to={`/${SHOP_ROUTE}/${slug}`}>
              {name}
            </NavLink>
          </div>
          <p>
            {listedSpecifications}
          </p>
          <div className="addons-buttons">
            <RefocusedElement>
              <Button
                buttonStyle="secondary"
                onClick={openWarrantyModal}
                className="warranty-button"
              >
                {showChangeWarrantyButton ? 'Change warranty' : 'Extend warranty'}
              </Button>
            </RefocusedElement>
            <RefocusedElement>
              <Button
                onClick={openInsuranceModal}
                buttonStyle="secondary"
                className="insurance-button"
              >
                Add insurance
              </Button>
            </RefocusedElement>
          </div>
          <div className="price-row">
            <DiscountTag
              discount={discount}
            />
            <PriceTags
              price={price}
              discount={discount}
            />
          </div>
        </div>
      </div>
      {showAddonsUl && (
        <List
          className="addons-ul"
          items={addons!}
          renderAs={(orderedAddon) => (
            <li key={orderedAddon.id}>
              <CartAddon orderedAddon={orderedAddon} />
            </li>
          )}
        />
      )}
      <div className="divider" />
      <RefocusedElement>
        <CloseButton onMouseDown={openDeleteModal} />
      </RefocusedElement>
    </div>
  );
}

export default CartItem;
