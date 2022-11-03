import React from 'react';

interface SectionHeaderProps {
  header: string;
}

function SectionHeader({ header }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2>
        {header}
      </h2>
      <div className="divider" />
    </div>
  );
}

export default SectionHeader;
