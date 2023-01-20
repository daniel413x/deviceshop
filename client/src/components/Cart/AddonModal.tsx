import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/context';
import { IAddon, IOrderedAddon, IOrderedProduct } from '../../types/types';
import List from '../List';
import Modal from '../Modal';
import AddonChoice from './AddonChoice';
import CloseButton from '../CloseButton';
import { fetchAddons } from '../../http/addonAPI';
import { createOrderedAddon, deleteOrderedAddon } from '../../http/orderedAddonAPI';

interface AddonModalProps {
  id: string;
  name: string;
  thumbnail: string;
  close: () => void;
  category: string;
}

function AddonModal({
  id,
  name,
  thumbnail,
  close,
  category,
}: AddonModalProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAddon, setSelectedAddon] = useState<IAddon>();
  const [addons, setAddons] = useState<IAddon[]>([]);
  const { user, cart } = useContext(Context);
  const removeAddon = async () => {
    if (user.isGuest) {
      const guestItems: IOrderedProduct[] = JSON.parse(localStorage.getItem('guestItems')!);
      const updatedItem = guestItems.find((orderedProduct) => orderedProduct.id === id);
      if (updatedItem) {
        updatedItem.addons = updatedItem.addons.filter((addon) => addon.addonId !== selectedAddon!.id);
        localStorage.setItem('guestItems', JSON.stringify(guestItems.map((guestItem) => {
          if (guestItem.id === updatedItem.id) {
            return updatedItem;
          }
          return guestItem;
        })));
      }
      cart.removeAddon(id, selectedAddon!.id);
      setSelectedAddon(undefined);
      return;
    }
    const orderedAddon = cart.findOrderedAddon(selectedAddon!.id);
    if (orderedAddon) {
      setLoading(true);
      await deleteOrderedAddon(orderedAddon!.id);
      cart.removeAddon(id, selectedAddon!.id);
      setSelectedAddon(undefined);
      setLoading(false);
    }
  };
  const selectAddon = async (selection: IAddon) => {
    if (selectedAddon) {
      removeAddon();
    }
    if (user.isGuest) {
      const guestItems: IOrderedProduct[] = JSON.parse(localStorage.getItem('guestItems')!);
      const updatedItem = guestItems.find((orderedProduct) => id === orderedProduct.id);
      if (updatedItem) {
        const orderedAddonForGuest: IOrderedAddon = {
          id: Date.toString(),
          addonId: selection.id,
          addon: selection,
          orderedProductId: id,
          category,
          price: selection.price,
        };
        if (updatedItem.addons) {
          updatedItem.addons.push(orderedAddonForGuest);
        } else {
          updatedItem.addons = [orderedAddonForGuest];
        }
        localStorage.setItem('guestItems', JSON.stringify(guestItems.map((guestItem) => {
          if (guestItem.id === updatedItem.id) {
            return updatedItem;
          }
          return guestItem;
        })));
        cart.addAddon(id, orderedAddonForGuest);
        setSelectedAddon(selection);
      }
      return;
    }
    setLoading(true);
    const newAddon = await createOrderedAddon({
      addonId: selection.id,
      orderedProductId: id,
      price: selection.price,
      category,
    });
    cart.addAddon(id, newAddon);
    setSelectedAddon(selection);
    setLoading(false);
  };
  const fetch = async (fetchedCategory: string) => fetchAddons({ where: { category: fetchedCategory } });
  useEffect(() => {
    (async () => {
      const fetchedAddons = await fetch(category); // passed-in fetch, passed-in addon category for modal re-usability
      setAddons(fetchedAddons.rows);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    setSelectedAddon(undefined);
    let preselectAddon;
    for (let i = 0; i < addons.length; i += 1) {
      for (let j = 0; j < cart.items.length; j += 1) {
        preselectAddon = cart.items[j].addons?.find((addon) => addon.addonId === addons[i].id) && cart.items[j].id === id;
        if (preselectAddon) {
          setSelectedAddon(addons[i]);
          return;
        }
      }
    }
  }, [id]);
  return (
    <Modal
      show={id}
      close={close}
      className={`cartitem-addon ${loading && 'loading'}`}
      id="cartitem-addon"
      size="large"
    >
      <div className="window-header">
        <div className="left-col">
          <img
            className="thumbnail-col"
            src={`${process.env.REACT_APP_API_URL}${thumbnail}`}
            alt={`Thumbnail for ${name}`}
          />
          <span className="name">
            {name}
          </span>
        </div>
        <CloseButton
          onMouseDown={close}
        />
      </div>
      <div className="body">
        <h2 className="header">
          {category}
          {' '}
          options
        </h2>
        <List
          className="addon-choice-ul"
          items={addons}
          renderAs={(addon) => (
            <li key={addon.id}>
              <AddonChoice
                addon={addon}
                selectedAddonId={selectedAddon?.id}
                selectAddon={selectAddon}
                removeAddon={removeAddon}
              />
            </li>
          )}
        />
      </div>
    </Modal>
  );
}

export default observer(AddonModal);
