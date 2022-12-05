import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SliderComponent from '../SliderComponent';
import imageOne from '../../assets/images/frontpage-slider-img-1.jpg';
import imageTwo from '../../assets/images/frontpage-slider-img-2.jpg';
import imageThree from '../../assets/images/frontpage-slider-img-3.jpg';
import imageFour from '../../assets/images/frontpage-slider-img-4.jpg';
import imageFive from '../../assets/images/frontpage-slider-img-5.jpg';
import { IShopElement } from '../../types/types';
import { fetchShopElementByReference } from '../../http/shopElementAPI';

function SliderWithAd() {
  const [ad, setAd] = useState<IShopElement>();
  const sliderImages = [
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive,
  ];
  useEffect(() => {
    (async () => {
      const foregroundImage = await fetchShopElementByReference('front-page-slider-foreground');
      setAd(foregroundImage);
    })();
  }, []);
  return (
    <div className="slider-with-ad">
      {ad && (
        <NavLink to={ad.to}>
          <img
            className="fg-header"
            src={`${process.env.REACT_APP_API_URL}${ad?.image}`}
            alt="Promotional"
          />
        </NavLink>
      )}
      <SliderComponent
        items={sliderImages}
        autoplay
      />
    </div>
  );
}

export default SliderWithAd;
