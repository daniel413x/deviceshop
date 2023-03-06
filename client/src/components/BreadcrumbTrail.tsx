import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export interface BreadcrumbTrailProps {
  lastString?: string;
  sliceLastN?: number;
  blockedLinks?: string[];
}

function BreadcrumbTrail({
  lastString,
  sliceLastN = 0,
  blockedLinks = [],
}: BreadcrumbTrailProps) {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.split(/\//).filter(Boolean);
  const isDemo = breadcrumbs[0] === 'demo';
  if (lastString) {
    breadcrumbs[breadcrumbs.length - 1] = lastString;
  }
  return (
    <ul className={`breadcrumb-trail ${isDemo && 'blocked'}`}>
      <li key="breadcrumb_main">
        <div className="breadcrumb">
          <NavLink to="/" className="previous">
            Main
          </NavLink>
          <span className="angle">
            &gt;
          </span>
        </div>
      </li>
      {breadcrumbs.slice(0, breadcrumbs.length - sliceLastN).map((str, i) => {
        let navBack = '';
        for (let n = 0; n < i + 1; n += 1) {
          navBack += `/${breadcrumbs[n]}`;
        }
        const finalIndex = i < breadcrumbs.length - 1 - sliceLastN;
        const blockLink = blockedLinks.indexOf(str) >= 0;
        if (finalIndex) {
          return (
            <li key={str}>
              <div className="breadcrumb">
                <NavLink
                  to={navBack}
                  className={`previous ${blockLink && 'blocked'}`}
                  tabIndex={blockLink ? -1 : undefined}
                >
                  {str}
                </NavLink>
                <span className="angle">
                  &gt;
                </span>
              </div>
            </li>
          );
        }
        return (
          <li key={str}>
            <span className="breadcrumb current">
              {str}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

BreadcrumbTrail.defaultProps = {
  lastString: '',
  sliceLastN: 0,
  blockedLinks: [],
};

export default BreadcrumbTrail;
