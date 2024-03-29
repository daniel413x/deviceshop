import React, { useState } from 'react';
import { ReactComponent as TriangleDown } from '../assets/icons/triangle-down.svg';
import { Children } from '../types/types';
import Button from './Button';

interface CollapsibleInfoProps {
  header: string;
  className?: string;
  children: Children;
}

function CollapsibleInfo({
  header,
  className,
  children,
}: CollapsibleInfoProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className={`collapsible-info ${className}`}>
      <div className="divider" />
      <Button
        buttonStyle="blank"
        className="collapse-button"
        onClick={() => setCollapsed(!collapsed)}
      >
        <TriangleDown
          className={`triangle-down ${collapsed && 'collapsed'}`}
        />
        <h4>
          {header}
        </h4>
      </Button>
      <div className={`content ${collapsed && 'collapsed'}`}>
        {children}
      </div>
    </div>
  );
}

CollapsibleInfo.defaultProps = {
  className: '',
};

export default CollapsibleInfo;
