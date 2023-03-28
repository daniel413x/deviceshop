import React, {
  useState, useEffect, ChangeEvent, useRef,
} from 'react';
import useInputIncomplete from '../../../hooks/useInputIncomplete';
import Button from '../../Button';

interface UploadedImageProps {
  buttonClass?: string;
  imageClass?: string;
  initialImage?: (string | File);
  pressedSubmit?: boolean;
  setPressedSubmit?: (param: boolean) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeWith?: () => void;
  name: string;
  id?: string;
  tabbable?: number;
}

function UploadedImage({
  imageClass,
  buttonClass,
  initialImage,
  pressedSubmit,
  setPressedSubmit,
  onChange,
  onChangeWith,
  name,
  id,
  tabbable,
}: UploadedImageProps) {
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
  const [preview, setPreview] = useState<string>('');
  const {
    warn,
  } = useInputIncomplete({
    value: selectedFile,
    setPressedSubmit,
    pressedSubmit,
  });
  const ref = useRef<HTMLInputElement>(null);
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      if (selectedFile) {
        return;
      }
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const handleOnChange = onChange || selectFile;
  useEffect(() => {
    if (selectedFile) {
      if (onChangeWith) {
        onChangeWith(); // minor usage in EditAvatarModal to unblock the input
      }
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);
  useEffect(() => {
    if (typeof initialImage === 'string') { // must be existing file from /static
      setPreview(`${process.env.REACT_APP_API_URL}${initialImage}`);
    } else if (typeof initialImage === 'object') { // must be generated file
      const {
        name: imageName,
        type,
      } = (initialImage as File);
      const image = new File([initialImage], imageName, { type });
      const transfer = new DataTransfer();
      transfer.items.add(image);
      ref.current!.files = transfer.files;
      const objectUrl = URL.createObjectURL(initialImage);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [initialImage]);
  return (
    <Button
      buttonStyle="blank"
      className={`uploaded-image button-overlay preview ${buttonClass}`}
      onClick={() => ref.current?.click()}
      tabIndex={tabbable}
    >
      <img
        src={preview}
        alt="Uploaded file"
        className={`preview ${imageClass}`}
      />
      <input
        id={id}
        type="file"
        onChange={handleOnChange}
        className={`replace-image-input hidden ${warn && 'warn'}`}
        name={name}
        // multiple={multiple}
        ref={ref}
      />
      <input
        id={`${id}_string`}
        type="hidden"
        name="images"
        value={name}
      />
      <div className="replace-message">
        Replace
      </div>
    </Button>
  );
}

UploadedImage.defaultProps = {
  id: '',
  imageClass: '',
  buttonClass: '',
  initialImage: '',
  onChange: undefined,
  onChangeWith: undefined,
  pressedSubmit: false,
  setPressedSubmit: false,
  tabbable: undefined,
};

export default UploadedImage;
