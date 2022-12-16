import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbTrail from '../components/BreadcrumbTrail';
import PageHeader from '../components/PageHeader';
import Subheaders from '../components/Login/Subheaders';
import Form from '../components/Login/Form';

function LoginRegister() {
  const { pathname } = useLocation();
  const isLogin = pathname.substring(1) === 'login';
  return (
    <div id="login-and-register">
      <BreadcrumbTrail />
      <PageHeader header={isLogin ? 'Login' : 'Register'} noEllipses noDiv />
      <Subheaders isLogin={isLogin} />
      <Form isLogin={isLogin} />
    </div>
  );
}

export default LoginRegister;
