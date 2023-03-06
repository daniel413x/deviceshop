import React, {
  useState, useRef, useEffect, useContext,
  ChangeEvent,
} from 'react';
import Slider from 'react-slick';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useKeyPress from '../hooks/useKeyPress';
import { ReactComponent as AddIcon } from '../assets/icons/Add.svg';
import { ReactComponent as TrashIcon } from '../assets/icons/Trash.svg';
import Button from './Button';
import SliderAngleButton from './SliderAngleButton';
import { Image } from '../types/types';
import Context from '../context/context';
import createProductPlaceholder from '../assets/images/create-product-placeholder.png';
import { CREATE_SHOPPRODUCT_ROUTE } from '../utils/consts';
import UploadedImage from './Account/Credentials/UploadedImage';

interface SliderComponentProps {
  propImages?: (string | Image)[];
  autoplay?: boolean;
  instant?: boolean;
  admin?: boolean;
}

function SliderComponent({
  propImages = [],
  autoplay,
  instant,
  admin,
}: SliderComponentProps) {
  const {
    createProductPage,
  } = useContext(Context);
  const { pathname } = useLocation();
  const [images, setImages] = useState<Image[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
    autoplaySpeed: 5000,
    fade: instant,
    afterChange: (newIndex: number) => {
      setActiveIndex(newIndex);
    },
  };
  const firstPageReached = activeIndex === 0;
  const lastPageReached = activeIndex === images.length - 1;
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
  const goTo = (nextIndex: number) => {
    if (blockActions) {
      return;
    }
    sliderRef.current!.slickGoTo(nextIndex);
  };
  useEffect(() => {
    tempBlock();
  }, [activeIndex]);
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
  const renderedImages = admin ? images : propImages;
  const showNextButton = renderedImages.length > 1 && activeIndex !== renderedImages.length - 1;
  const showPrevButton = activeIndex !== 0;
  const addImages = (e: any) => {
    const addedImages: Image[] = [];
    [...e.target.files].forEach((file: any) => addedImages.push({
      url: URL.createObjectURL(file),
      file,
    }));
    const nextImages = [...images, ...addedImages];
    setImages(nextImages);
    createProductPage.setImages(nextImages);
    goTo(nextImages.length - 1);
  };
  const shouldCleanupBackend = () => {
    if (images[activeIndex].url && !images[activeIndex].file) {
      createProductPage.addDeletedImage(images[activeIndex].url);
    }
    if (images[activeIndex].replaces) {
      createProductPage.addDeletedImage(images[activeIndex].replaces!);
    }
  };
  const replaceImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const nextImages = images.map((image, mappedIndex) => {
      const imageFileWillBeReplaced = !image.file;
      if (mappedIndex === activeIndex) {
        const newImage: Image = {
          file,
          url: URL.createObjectURL(file),
        };
        if (imageFileWillBeReplaced) {
          newImage.replaces = image.url;
        }
        return newImage;
      }
      return image;
    });
    setImages(nextImages);
    createProductPage.setImages(nextImages);
  };
  const deleteImage = () => {
    const nextImages = images.filter((image, mappedIndex) => mappedIndex !== activeIndex);
    setImages(nextImages);
    createProductPage.setImages(nextImages);
    shouldCleanupBackend();
  };
  useEffect(() => {
    if (admin && !createProductPage.loading && createProductPage.images.length > 0) {
      setImages(createProductPage.images.map((image) => ({
        url: `${process.env.REACT_APP_API_URL}${image.url}`,
        file: null,
      })));
      if (pathname === `/${CREATE_SHOPPRODUCT_ROUTE}`) {
        setImages([]);
      }
    }
  }, [createProductPage.loading]);
  const addImageRef = useRef<HTMLInputElement>(null);
  const deleteImageRef = useRef<HTMLInputElement>(null);
  return (
    <div className="slider">
      <div className="main-wrapper">
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
          {admin && images.length === 0 && (
            <img
              src={createProductPlaceholder}
              alt="Placeholder"
            />
          )}
          {admin ? images.map((img, imageIndex) => (
            <UploadedImage
              initialImage={img.url}
              key={img.url}
              name={img.url}
              onChange={replaceImage}
              imageClass="slid-image"
              tabbable={activeIndex === imageIndex ? 0 : -1}
            />
          )) : (propImages as string[]).map((img, imageIndex) => (
            <img
              // eslint-disable-next-line react/no-array-index-key
              key={`${img}${imageIndex}`}
              src={img}
              alt="Product in slider"
              className="slid-image"
            />
          ))}
        </Slider>
        <ul className="dots">
          {renderedImages.map((img, mapIndex) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`${img}${mapIndex}_slider_button`}

            >
              <button
                type="button"
                onClick={() => goTo(mapIndex)}
                className={`dot ${activeIndex === mapIndex ? 'active' : undefined}`}
                aria-label="Go to slide"
                tabIndex={mapIndex === activeIndex ? -1 : 0}
              />
            </li>
          ))}
        </ul>
        {admin && (
        <Button
          buttonStyle="blank"
          className="add-image overlay-button"
          onClick={() => addImageRef.current?.click()}
        >
          <AddIcon
            className="add-icon"
          />
          Add image
          <input
            type="file"
            multiple
            ref={addImageRef}
            className="hidden add-image-input"
            onChange={addImages}
            name="files[]"
          />
        </Button>
        )}
        {images.length > 1 && admin && (
        <Button
          buttonStyle="blank"
          className="delete-image overlay-button"
          onClick={() => deleteImage()}
        >
          <TrashIcon
            className="trash-icon"
          />
          Delete image
          <input
            ref={deleteImageRef}
            className="hidden"
            onChange={addImages}
          />
        </Button>
        )}
      </div>
    </div>
  );
}

SliderComponent.defaultProps = {
  autoplay: false,
  instant: false,
  admin: false,
  propImages: [],
};

export default observer(SliderComponent);
