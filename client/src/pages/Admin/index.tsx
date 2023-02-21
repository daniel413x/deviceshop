import React from 'react';
import AdminSideCol from '../../components/Admin/AdminSideCol';
import ColumnedPage from '../../components/ColumnedPage';
import useBreakpoints from '../../hooks/useBreakpoints';

function Admin() {
  const { md } = useBreakpoints();
  return (
    <ColumnedPage
      id="admin"
      leftSideCol={md ? <AdminSideCol /> : undefined}
      header="Admin"
    >
      {!md && (
        <AdminSideCol />
      )}
    </ColumnedPage>
  );
}

export default Admin;
