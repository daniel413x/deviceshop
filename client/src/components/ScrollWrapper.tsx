import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Children } from '../types/types';

interface ScrollWrapperProps {
  children: Children;
}

function ScrollWrapper({ children }: ScrollWrapperProps) {
  const location = useLocation();
  useLayoutEffect(() => {
    if (location.pathname === '/blog'/* && window.scrollY <= 325 */) {
      return;
    }
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default ScrollWrapper;
