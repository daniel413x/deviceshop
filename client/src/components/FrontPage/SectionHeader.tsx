import React from 'react';
import ShownInView from '../ShownInView';

interface SectionHeaderProps {
  header: string;
  colorStyle?: 'light';
}

function SectionHeader({ header, colorStyle }: SectionHeaderProps) {
  return (
    <ShownInView className={`section-header ${colorStyle}`}>
      <h2>
        {header}
      </h2>
      <div className="divider" />
    </ShownInView>
  );
}

SectionHeader.defaultProps = {
  colorStyle: '',
};

export default SectionHeader;
