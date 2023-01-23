import React from 'react';
import { Children } from '../../types/types';

interface FilterLinksProps {
  children: Children;
}

function FilterLinks({
  children,
}: FilterLinksProps) {
  return (
    <div className="filter-links">
      {children}
    </div>
  );
}

export default FilterLinks;
