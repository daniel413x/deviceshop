import React, { useEffect, useState } from 'react';
import Logo from '../assets/logos/logo-medium.png';
import LoadingAnimation from './LoadingAnimation';

interface LoadingScreenProps {
  router?: boolean;
}

function LoadingScreen({
  router,
}: LoadingScreenProps) {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (router) {
      setTimeout(() => setShow(true), 200);
    }
  }, []);
  const render = (router && show) || (!router);
  return (
    <div className={`loading-screen ${router && 'router'}`}>
      {render && (
      <div className="wrapper">
        <img className="loading-logo" src={Logo} alt="Loading logo" />
        <LoadingAnimation colorStyle="accent" />
      </div>
      )}
    </div>
  );
}

LoadingScreen.defaultProps = {
  router: false,
};

export default LoadingScreen;
