import React from 'react';

const LoadingSpinner = ({
  size = 24,
  color = '#C05A38',
  thickness = 2,
  className = '',
  style = {}
}) => (
  <div
    className={`loading-spinner ${className}`}
    style={{
      width: size,
      height: size,
      border: `${thickness}px solid #E8E0D4`,
      borderTop: `${thickness}px solid color`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      ...style
    }}
  />
);

export default LoadingSpinner;