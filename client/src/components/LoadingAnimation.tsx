import React from 'react';

interface LoadingAnimationProps {
  className?: string;
}

function LoadingAnimation({ className }: LoadingAnimationProps) {
  return (
    <div className={`loading-icon ${className}`}>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

LoadingAnimation.defaultProps = {
  className: '',
};

export default LoadingAnimation;
