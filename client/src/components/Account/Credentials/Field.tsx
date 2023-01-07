import React from 'react';
import { unCamelCase } from '../../../utils/functions';
import Button from '../../Button';

interface FieldProps {
  field: string;
  value?: string;
  openEditFieldModal: (editedFieldName: string, previousVal: string) => void;
}

function Field({
  field,
  value,
  openEditFieldModal,
}: FieldProps) {
  const fieldReadable = unCamelCase(field);
  return (
    <div className="field">
      <div className="field-value-col">
        <span className="key">
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

Field.defaultProps = {
  value: '',
};

export default Field;
