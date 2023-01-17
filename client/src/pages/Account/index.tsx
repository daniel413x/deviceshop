import React from 'react';
import BreadcrumbTrail from '../../components/BreadcrumbTrail';
import AccountSideCol from '../../components/Account/AccountSideCol';
import useBreakpoints from '../../hooks/useBreakpoints';

function Account() {
  const { md } = useBreakpoints();
  return (
    <div id="admin">
      <div className="columned-page">
        {md && (
          <AccountSideCol />
        )}
        <div className="main-col">
          <BreadcrumbTrail />
          {!md && (
            <AccountSideCol />
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
