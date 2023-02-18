import React from 'react';
import Logo from '../assets/logos/logo-medium.png';
import LoadingAnimation from './LoadingAnimation';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="wrapper">
        <img className="loading-logo" src={Logo} alt="Loading logo" />
        <LoadingAnimation colorStyle="accent" />
      </div>
    </div>
  );
}

export default LoadingScreen;
