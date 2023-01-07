import React, { useRef } from 'react';
import { Image } from '../types/types';

interface SliderImageReplaceButtonProps {
  img: Image;
  replaceImage: (e: any, replacedIndex: number) => void;
  index: number;
}

function SliderImageReplaceButton({
  img,
  replaceImage,
  index,
}: SliderImageReplaceButtonProps) {
  const replaceImageRef = useRef<HTMLInputElement>(null);
  return (
    <button
      className="image-wrapper"
      onClick={() => replaceImageRef.current?.click()}
      title="Click to replace"
      type="button"
    >
      <img
        // eslint-disable-next-line react/no-array-index-key
        key={`${img.url}${index}`}
        src={img.url}
        alt="Product in slider"
        className="slid-image"
      />
      <input
        type="file"
        className="hidden"
        onChange={(e) => replaceImage(e, index)}
        ref={replaceImageRef}
      />
    </button>
  );
}

export default SliderImageReplaceButton;
