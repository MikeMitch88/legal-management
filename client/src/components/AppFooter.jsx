import React from 'react'

const AppFooter = () => {
  const currentYear =new Date().getFullYear();
  return (
    <div className='AppFooter' >
        <footer>
          <p>&copy; {currentYear} RELON-KENYA. All Rights Reserved. </p>
        </footer>
      
    </div>
  )
}

export default AppFooter
