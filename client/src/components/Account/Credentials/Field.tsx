import React from 'react';
import { unCamelCase } from '../../../utils/functions';
import Button from '../../Button';
import RefocusedElement from '../../RefocusedElement';

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
  const avatarField = field === 'avatar';
  const fieldReadable = unCamelCase(field);
  return (
    <div className="field">
      <div className="field-value-col">
        <span className="key">
          {fieldReadable}
        </span>
        <span className="value">
          {!avatarField && (value || 'Blank')}
          {avatarField && (
            <img
              src={`${process.env.REACT_APP_API_URL}${value}`}
              alt="Your avatar"
              className="avatar"
            />
          )}
        </span>
      </div>
      <RefocusedElement>
        <Button
          onClick={openEditFieldModal}
        >
          Change
        </Button>
      </RefocusedElement>
    </div>
  );
}

Field.defaultProps = {
  value: '',
};

export default Field;
