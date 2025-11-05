/**
 * Loading Spinner Component
 * Reusable loading indicator
 */

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large',
  };

  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner ${sizeClasses[size]}`}>
        <div className="spinner"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
