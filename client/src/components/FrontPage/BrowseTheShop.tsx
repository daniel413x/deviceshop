import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import { fetchShopElementByReferences } from '../../http/shopElementAPI';
import { IShopElement } from '../../types/types';
import ShownInView from '../ShownInView';

function BrowseTheShop() {
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLinks, setImageLinks] = useState<IShopElement[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const links = await fetchShopElementByReferences([
          'front-page-links-row-box-one',
          'front-page-links-row-box-two',
          'front-page-links-row-box-three',
          'front-page-links-row-box-four',
          // 'front-page-links-row-box-five',
          // 'front-page-links-row-box-eight',
          // 'front-page-links-row-box-nine',
          // 'front-page-links-row-box-ten',
          // 'front-page-links-row-box-eleven',
          // 'front-page-links-row-box-twelve',
        ]);
        setImageLinks(links);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const fetch = async () => {
    try {
      const links = await fetchShopElementByReferences([
        'front-page-links-row-box-one',
        'front-page-links-row-box-two',
        'front-page-links-row-box-three',
        'front-page-links-row-box-four',
        // 'front-page-links-row-box-five',
        // 'front-page-links-row-box-eight',
        // 'front-page-links-row-box-nine',
        // 'front-page-links-row-box-ten',
        // 'front-page-links-row-box-eleven',
        // 'front-page-links-row-box-twelve',
      ]);
      setImageLinks(links);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ShownInView className={`browse-the-shop ${loading}`} id="browse-the-shop" timeout={0} func={fetch}>
      <div className="bg" />
      <SectionHeader
        header="Browse the shop"
        colorStyle="light"
      />
      <div className="row">
        {imageLinks.map((link) => (
          <NavLink
            to={link.to}
            key={link.image}
            className="box-link"
          >
            <img
              src={`${process.env.REACT_APP_API_URL}${link.image}`}
              alt="Shop now"
            />
          </NavLink>
        ))}
      </div>
    </ShownInView>
  );
}

export default BrowseTheShop;
