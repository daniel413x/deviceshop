import { observer } from 'mobx-react-lite';
import React, {
  RefObject, useContext, useEffect, useState,
} from 'react';
import Context from '../../context/context';
import { IAddon } from '../../types/types';
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
  passedInRef?: RefObject<any>;
}

function AddonModal({
  id,
  name,
  thumbnail,
  close,
  category,
  passedInRef,
}: AddonModalProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAddon, setSelectedAddon] = useState<IAddon>();
  const [addons, setAddons] = useState<IAddon[]>([]);
  const { cart } = useContext(Context);
  const removeAddon = async () => {
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
      await removeAddon();
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
      ref={passedInRef}
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

AddonModal.defaultProps = {
  passedInRef: undefined,
};

export default observer(AddonModal);
