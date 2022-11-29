import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import { fetchShopElementByReferences } from '../../http/shopElementAPI';
import { IShopElement } from '../../types/types';

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
          'front-page-links-row-box-five',
          'front-page-links-row-box-six',
          'front-page-links-row-box-seven',
          'front-page-links-row-box-eight',
          'front-page-links-row-box-nine',
          'front-page-links-row-box-ten',
          'front-page-links-row-box-eleven',
          'front-page-links-row-box-twelve',
        ]);
        setImageLinks(links);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div id="browse-the-shop" className={`browse-the-shop ${loading}`}>
      <SectionHeader
        header="Browse the shop"
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
    </div>
  );
}

export default BrowseTheShop;
