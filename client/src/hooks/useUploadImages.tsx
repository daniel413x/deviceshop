import React, { useState, useEffect } from 'react';

const useUploadImages = () => {
  const [images, setImages] = useState([] as any);
  const [imageURLS, setImageURLs] = useState([]);
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image:any) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e: any) {
    setImages([...e.target.files]);
  }

  return (
    <>
      <input type="file" multiple accept="image/*" onChange={onImageChange} />
      {imageURLS.map((imageSrc) => (
        <img src={imageSrc} alt="not fount"  />
      ))}
    </>
  );
};

export default useUploadImages;
