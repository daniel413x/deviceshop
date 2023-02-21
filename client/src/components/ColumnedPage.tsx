import React, { ReactElement } from 'react';
import BreadcrumbTrail, { BreadcrumbTrailProps } from './BreadcrumbTrail';
import PageHeader, { PageHeaderProps } from './PageHeader';
import useBreakpoints from '../hooks/useBreakpoints';
import { Children } from '../types/types';
import ShopSideCol from './ShopSideCol';

interface ColumnedPageProps {
  children?: Children;
  className?: string;
  id?: string;
  leftSideCol?: ReactElement | false;
  rightSideCol?: ReactElement | false;
}

function ColumnedPage({ // OrderConfirmation does not use this abstraction due to layout reqs
  children,
  id,
  header,
  className,
  leftSideCol,
  rightSideCol,
  noEllipses,
  noDiv,
  sliceLastN,
  blockedLinks,
}: ColumnedPageProps & Partial<PageHeaderProps> & BreadcrumbTrailProps) {
  const { width } = useBreakpoints();
  const rightColBreakpoint = width >= 1203;
  return (
    <div id={id} className={className}>
      <div className="columned-page">
        {leftSideCol}
        <div className="main-col" id="main-col">
          <BreadcrumbTrail
            sliceLastN={sliceLastN}
            blockedLinks={blockedLinks}
          />
          {header && (
            <PageHeader
              header={header || ''}
              noEllipses={noEllipses}
              noDiv={noDiv}
            />
          )}
          {children}
          {!rightColBreakpoint && rightSideCol}
        </div>
        {(rightColBreakpoint) && rightSideCol}
      </div>
    </div>
  );
}

ColumnedPage.defaultProps = {
  id: '',
  children: undefined,
  className: '',
  leftSideCol: <ShopSideCol />,
  rightSideCol: undefined,
};

export default ColumnedPage;
