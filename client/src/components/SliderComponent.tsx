import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import useKeyPress from '../hooks/useKeyPress';
import SliderAngleButton from './SliderAngleButton';

interface SliderComponentProps {
  items: string[];
  autoplay?: boolean;
  instant?: boolean;
}

function SliderComponent({
  items,
  autoplay,
  instant,
}: SliderComponentProps) {
  const [page, setPage] = useState<number>(0);
  const rightPress = useKeyPress('ArrowRight');
  const leftPress = useKeyPress('ArrowLeft');
  const [blockActions, setBlockActions] = useState<boolean>(false);
  const sliderRef = useRef<Slider>(null);
  const settings = {
    infinite: true,
    speed: instant ? 0 : 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: false,
    accessibility: true,
    autoplay,
    fade: instant,
    afterChange: (newIndex: number) => {
      setPage(newIndex);
    },
  };
  const firstPageReached = page === 0;
  const lastPageReached = page === items.length - 1;
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
  const showNextButton = page !== items.length - 1;
  const showPrevButton = page !== 0;
  return (
    <div className="slider">
      <div className="wrapper">
        {showNextButton && (
          <SliderAngleButton
            className="angle-button-next"
            func={next}
          />
        )}
        {showPrevButton && (
          <SliderAngleButton
            className="angle-button-prev"
            func={prev}
          />
        )}
        <Slider
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...settings}
          ref={sliderRef}
        >
          {items.map((img, i) => (
            <img
              // eslint-disable-next-line react/no-array-index-key
              key={`${img}${i}`}
              src={img}
              alt="Product in slider"
              className="slid-image"
            />
          ))}
        </Slider>
        <ul className="dots">
          {items.map((img, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`${img}${index}_slider_button`}
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

SliderComponent.defaultProps = {
  autoplay: false,
  instant: false,
};

export default SliderComponent;
