import React from 'react';
import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import AdminSideCol from '../../components/Admin/AdminSideCol';
import useBreakpoints from '../../hooks/useBreakpoints';

function Admin() {
  const { md } = useBreakpoints();
  return (
    <div id="admin">
      <div className="columned-page">
        {md && (
          <AdminSideCol />
        )}
        <div className="main-col">
          <BreadcrumbTrail />
          {!md && (
            <AdminSideCol />
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
