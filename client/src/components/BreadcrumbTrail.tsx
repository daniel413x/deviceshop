import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface BreadcrumbTrailProps {
  lastString?: string;
}

function BreadcrumbTrail({
  lastString,
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
      {breadcrumbs.map((str, i) => {
        let navBack = '';
        for (let n = 1; n < breadcrumbs.length - i; n += 1) {
          navBack += '../';
        }
        if (i < breadcrumbs.length - 1) {
          return (
            <li key={str}>
              <div className="breadcrumb">
                <NavLink to={`${navBack}${str!}`} className="previous">
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
};

export default BreadcrumbTrail;
