import React from 'react';

interface LoadingAnimationProps {
  className?: string;
  colorStyle?: 'accent' | '';
}

function LoadingAnimation({ className, colorStyle }: LoadingAnimationProps) {
  return (
    <div className={`loading-icon ${className}`}>
      <div className={`lds-ring ${colorStyle}`}>
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
  colorStyle: '',
};

export default LoadingAnimation;
