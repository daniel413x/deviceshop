import React from 'react';
import { ReactComponent as Ellipses } from '../assets/icons/Ellipses.svg';

interface PageHeaderProps {
  header: string;
  noDiv?: boolean;
  noEllipses?: boolean;
}

function PageHeader({
  header,
  noDiv,
  noEllipses,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="row">
        <h1>
          {header}
        </h1>
        {!noEllipses && <Ellipses />}
      </div>
      {!noDiv && <div className="divider" />}
    </div>
  );
}

PageHeader.defaultProps = {
  noDiv: false,
  noEllipses: false,
};

export default PageHeader;
