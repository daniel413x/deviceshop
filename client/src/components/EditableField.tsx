import React, {
  useEffect,
  useState,
  FormEvent,
} from 'react';
import Button from './Button';
import { ReactComponent as EditIcon } from '../assets/icons/Edit.svg';
import { selectEnd } from '../utils/functions';

interface DynamicSpanProps {
  onBlur: () => void;
  onFocus: () => void;
  id: string;
  onInput: (e: FormEvent) => void;
  value: string;
}

function DynamicSpan({
  onBlur,
  onFocus,
  id,
  onInput,
  value,
}: DynamicSpanProps) {
  return (
    <span
      suppressContentEditableWarning
      contentEditable
      onInput={onInput}
      onFocus={onFocus}
      onBlur={onBlur}
      id={id}
    >
      {value}
    </span>
  );
}

interface EditableFieldProps {
  outsideInput?: string;
  setOutsideInput?: (e: string) => void;
  noFocusButton?: boolean; // default edit button isn't always feasible placement-wise
  name?: string;
  id: string;
}

function EditableField({
  outsideInput,
  setOutsideInput,
  noFocusButton,
  name,
  id,
}: EditableFieldProps) {
  const [formValue, setFormValue] = useState<string>(outsideInput || '');
  const [initialValue] = useState<string>(outsideInput || 'Field');
  const [focused, setFocused] = useState<boolean>(false);
  const onInput = (e: FormEvent) => {
    if (setOutsideInput) {
      setOutsideInput(e.currentTarget.textContent!);
    }
    if (name) {
      setFormValue(e.currentTarget.textContent!);
    }
  };
  const generateSpan = (value: string) => (
    <DynamicSpan
      value={value}
      onInput={onInput}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      id={id}
    />
  );
  const [span, setSpan] = useState(generateSpan(initialValue));
  useEffect(() => {
    if (!focused) {
      setSpan(generateSpan(outsideInput || ''));
      if (name) {
        setFormValue(outsideInput || '');
      }
    }
  }, [outsideInput]);
  return (
    <div
      className="editable-field"
    >
      {span}
      {!noFocusButton && (
        <Button
          className="edit-button"
          buttonStyle="blank"
          onClick={() => {
            const focusedField = document.getElementById(id);
            focusedField?.focus();
            selectEnd(focusedField);
          }}
        >
          <EditIcon />
        </Button>
      )}
      <input
        type="hidden"
        name={name}
        id={id}
        value={formValue || outsideInput}
      />
    </div>
  );
}

EditableField.defaultProps = {
  outsideInput: '',
  name: '',
  setOutsideInput: false,
  noFocusButton: false,
};

export default EditableField;
