import React, { useState } from 'react';
import { Typography } from 'antd';

const Setting = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  // Toggle function to switch themes
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div>
      <Typography.Title level={6}>Settings</Typography.Title>
      <div className={isDarkMode ? 'dashboard-container dark-mode' : 'dashboard-container'}>
        <button className="toggles-btn" onClick={toggleTheme}>
          {isDarkMode ? 'Dark🌞' : 'Light🌙'} Mode
        </button>
      </div>
    </div>
  );
};

export default Setting;
