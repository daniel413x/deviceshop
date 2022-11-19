import React from 'react';

interface PageHeaderProps {
  header: string;
}

function PageHeader({ header }: PageHeaderProps) {
  return (
    <h1 className="page-header">
      {header}
    </h1>
  );
}

export default PageHeader;
