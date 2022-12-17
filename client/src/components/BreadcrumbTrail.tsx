import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface BreadcrumbTrailProps {
  lastString?: string;
  sliceLastN?: number;
}

function BreadcrumbTrail({
  lastString,
  sliceLastN = 0,
}: BreadcrumbTrailProps) {
  const breadcrumbs = useLocation().pathname.split(/\//).filter(Boolean);
  if (lastString) {
    breadcrumbs[breadcrumbs.length - 1] = lastString;
  }
  return (
    <ul className="breadcrumb-trail">
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
        if (finalIndex) {
          return (
            <li key={str}>
              <div className="breadcrumb">
                <NavLink to={navBack} className="previous">
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
};

export default BreadcrumbTrail;
