import React from 'react';
import { shopSideColButtons } from '../utils/arrays';
import NavButtonsAndDropdowns from './NavButtonsAndDropdowns';

function SideCol() {
  return (
    <NavButtonsAndDropdowns
      items={shopSideColButtons}
    />
  );
}

export default SideCol;
