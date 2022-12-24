import React from 'react';
import { unCamelCase } from '../../../utils/functions';
import Button from '../../Button';

interface EditableFieldProps {
  field: string;
  value?: string;
  openEditFieldModal: (editedFieldName: string, previousVal: string) => void;
}

function EditableField({
  field,
  value,
  openEditFieldModal,
}: EditableFieldProps) {
  const fieldReadable = unCamelCase(field);
  return (
    <div className="editable-field">
      <div className="field-value-col">
        <span className="field">
          {fieldReadable}
        </span>
        <span className="value">
          {value || 'Blank'}
        </span>
      </div>
      <Button
        onClick={openEditFieldModal}
      >
        Change
      </Button>
    </div>
  );
}

EditableField.defaultProps = {
  value: '',
};

export default EditableField;
