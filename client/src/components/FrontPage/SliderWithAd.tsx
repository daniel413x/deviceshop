import React, {
  useEffect, useRef, useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import SliderComponent from '../SliderComponent';
import imageOne from '../../assets/images/frontpage-slider-img-1.jpg';
import imageTwo from '../../assets/images/frontpage-slider-img-2.jpg';
import imageThree from '../../assets/images/frontpage-slider-img-3.jpg';
import imageFour from '../../assets/images/frontpage-slider-img-4.jpg';
import imageFive from '../../assets/images/frontpage-slider-img-5.jpg';
import { IShopElement } from '../../types/types';
import { fetchShopElementByReference } from '../../http/shopElementAPI';
import ShownInView from '../ShownInView';
import useTrackDimensions from '../../hooks/useTrackDimensions';

function SliderWithAd() {
  const [loading, setLoading] = useState<boolean>(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const { height } = useTrackDimensions(imageRef);
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
  useEffect(() => {
    if (height && height > 0) {
      setLoading(false);
    }
  }, [height]);
  return (
    <ShownInView className={`slider-with-ad ${loading && 'loading'}`} timeout={0}>
      {ad && (
        <NavLink to={ad.to}>
          <img
            className="fg-header"
            src={`${process.env.REACT_APP_API_URL}${ad?.image}`}
            alt="Promotional"
            ref={imageRef}
          />
        </NavLink>
      )}
      <SliderComponent
        propImages={sliderImages}
        autoplay
      />
    </ShownInView>
  );
}

export default SliderWithAd;
