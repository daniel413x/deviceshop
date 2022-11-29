import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import useKeyPress from '../../hooks/useKeyPress';
import imageOne from '../../assets/images/frontpage-slider-img-1.jpg';
import imageTwo from '../../assets/images/frontpage-slider-img-2.jpg';
import imageThree from '../../assets/images/frontpage-slider-img-3.jpg';
import imageFour from '../../assets/images/frontpage-slider-img-4.jpg';
import imageFive from '../../assets/images/frontpage-slider-img-5.jpg';
import { fetchShopElementByReference } from '../../http/shopElementAPI';
import { ReactComponent as SliderAngleButtonIcon } from '../../assets/icons/slider-angle-button.svg';
import { IShopElement } from '../../types/types';

interface SliderButtonProps {
  className: string;
  func: () => void;
}

function SliderAngleButton({ func, className }: SliderButtonProps) {
  return (
    <button
      className={`angle-button ${className}`}
      onClick={func}
      type="button"
    >
      <SliderAngleButtonIcon />
    </button>
  );
}

function FrontPageSlider() {
  const [foreground, setForeground] = useState<IShopElement>();
  const [page, setPage] = useState<number>(0);
  const rightPress = useKeyPress('ArrowRight');
  const leftPress = useKeyPress('ArrowLeft');
  const [blockActions, setBlockActions] = useState<boolean>(false);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
    accessibility: false,
    autoplay: !true,
    fade: true,
    afterChange: (newIndex: number) => {
      setPage(newIndex);
    },
  };
  const headerImages = [
    {
      img: imageOne,
    },
    {
      img: imageTwo,
    },
    {
      img: imageThree,
    },
    {
      img: imageFour,
    },
    {
      img: imageFive,
    },
  ];
  const firstPageReached = page === 0;
  const lastPageReached = page === headerImages.length - 1;
  const tempBlock = () => {
    setBlockActions(true);
    setTimeout(() => setBlockActions(false), 1100);
  };
  const next = () => {
    if (blockActions || lastPageReached) {
      return;
    }
    sliderRef.current!.slickNext();
  };
  const prev = () => {
    if (blockActions || firstPageReached) {
      return;
    }
    sliderRef.current!.slickPrev();
  };
  const goTo = (index: number) => {
    if (blockActions) {
      return;
    }
    sliderRef.current!.slickGoTo(index);
  };
  useEffect(() => {
    tempBlock();
  }, [page]);
  useEffect(() => {
    if (leftPress) {
      prev();
    }
  }, [leftPress]);
  useEffect(() => {
    if (rightPress) {
      next();
    }
  }, [rightPress]);
  useEffect(() => {
    (async () => {
      const foregroundImage = await fetchShopElementByReference('front-page-slider-foreground');
      setForeground(foregroundImage);
    })();
  }, []);
  return (
    <div id="top-slider" className="slider">
      <div className="wrapper">
        <SliderAngleButton
          className="angle-button-next"
          func={next}
        />
        <SliderAngleButton
          className="angle-button-prev"
          func={prev}
        />
        {foreground && (
          <NavLink to={foreground.to}>
            <img
              className="fg-header"
              src={`${process.env.REACT_APP_API_URL}${foreground?.image}`}
              alt="Promotional"
            />
          </NavLink>
        )}
        <Slider
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...settings}
          ref={sliderRef}
        >
          {headerImages.map(({ img }) => (
            <img
              key={img}
              src={img}
              alt=""
              className="slid-image"
            />
          ))}
        </Slider>
        <ul className="dots">
          {headerImages.map(({ img }, index) => (
            <li
              key={`${img}_slider_button`}
            >
              <button
                type="button"
                onClick={() => goTo(index)}
                className={`dot ${page === index ? 'active' : undefined}`}
              >
                {}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FrontPageSlider;
