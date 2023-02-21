import React, {
  useState, useEffect, ChangeEvent, useRef,
} from 'react';
import useInputIncomplete from '../../../hooks/useInputIncomplete';
import Button from '../../Button';

interface UploadedImageProps {
  buttonClass?: string;
  imageClass?: string;
  initialImage?: string;
  pressedSubmit?: boolean;
  setPressedSubmit?: (param: boolean) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeWith?: () => void;
  name: string;
  id?: string;
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
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };
  const handleOnChange = onChange || selectFile;
  useEffect(() => setPreview(initialImage || ''), [initialImage]);
  useEffect(() => {
    if (onChangeWith) {
      onChangeWith();
    }
    if (selectedFile && initialImage) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (!selectedFile && initialImage) {
      return setPreview(initialImage);
    }
    if (!selectedFile) {
      return setPreview('');
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  return (
    <Button
      buttonStyle="blank"
      className={`preview ${buttonClass}`}
      onClick={() => ref.current?.click()}
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
};

export default UploadedImage;
