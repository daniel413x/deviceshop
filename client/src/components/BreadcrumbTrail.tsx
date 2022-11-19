import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function BreadcrumbTrail() {
  const breadcrumbs = useLocation().pathname.split(/\//).filter(Boolean);
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
          <span key={str} className="breadcrumb current">
            {str}
          </span>
        );
      })}
    </ul>
  );
}

export default BreadcrumbTrail;
