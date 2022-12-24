import React from 'react';
import { Children } from '../types/types';

interface BorderButtonsRowProps {
  children: Children;
}

function BorderButtonsRow({
  children,
}: BorderButtonsRowProps) {
  return (
    <div className="border-buttons-row">
      {children}
    </div>
  );
}

export default BorderButtonsRow;
