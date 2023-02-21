import React from 'react';
import AccountSideCol from '../../components/Account/AccountSideCol';
import ColumnedPage from '../../components/ColumnedPage';
import useBreakpoints from '../../hooks/useBreakpoints';

function Account() {
  const { md } = useBreakpoints();
  return (
    <ColumnedPage
      id="admin"
      leftSideCol={md ? <AccountSideCol /> : undefined}
      header="Your account"
    >
      {!md && (
        <AccountSideCol />
      )}
    </ColumnedPage>
  );
}

export default Account;
