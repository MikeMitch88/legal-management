import React, { useState } from 'react'
import AppRoutes from './Routes/AppRoutes'

const PageContent = () => {
  const [isDarkMode, setIsDarkMode]=useState()

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (

    <div className={isDarkMode ? 'dashboard-container dark-mode' : 'dashboard-container'}>
    <button className="toggle-btn" onClick={toggleTheme}>
      {isDarkMode ? 'Dark🌞' : 'Light🌙'} Mode
    </button>

    

    <div className='PageContent' >
        <AppRoutes />
      
    </div>
    </div>
  )
}

export default PageContent
