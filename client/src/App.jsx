

import { Button, Space } from 'antd';
import './App.css'
import AppHeader from './components/AppHeader'
import SideMenu from './components/SideMenu'
import PageContent from './components/PageContent'
import AppFooter from './components/AppFooter'
import AppRoutes from './components/Routes/AppRoutes';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './components/AuthContext/AuthContext';

function App() {

  return (
    
    
    <div className='App' >
     <AppHeader />
     <Space className='SideMenuAndPageContent' >
    <SideMenu />
    <PageContent />
    {/* <AppRoutes /> */}
      </Space> 
      <AppFooter /> 
    </div> 
   
   
  
  );
}

export default App









































































































// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import AppHeader from './components/AppHeader';
// import SideMenu from './components/SideMenu';
// import PageContent from './components/PageContent';
// import AppFooter from './components/AppFooter';
// import Login from './components/Auth/Login';
// import Admin from './components/Admin/Admin';
// import Psychology from './components/CaseManagement/Psychology';
// import ClientDetails from './components/ClientManagement/Reception';
// import ClientDetailsForm from './components/CaseManagement/Legal';
// import Case from './Pages/Case';

// function App() {
//   const [role, setRole] = useState(localStorage.getItem('role'));  // Get from localStorage
//   const [token, setToken] = useState(localStorage.getItem('token'));  // Get from localStorage

//   useEffect(() => {
//     // When role or token changes, save it to localStorage
//     if (role) localStorage.setItem('role', role);
//     if (token) localStorage.setItem('token', token);
//   }, [role, token]);

//   const handleLogin = (userRole, userToken) => {
//     setRole(userRole);
//     setToken(userToken);
//   };

//   return (
//     <Router>
//       {!token ? (
//         <Login onLogin={(userRole, userToken) => handleLogin(userRole, userToken)} />
//       ) : (
//         <div className="App">
//           <AppHeader />
//           <div className='SideMenuAndPageContent'>
//             <SideMenu role={role} />
//             <PageContent />
//           </div>
//           <AppFooter />
//         </div>
//       )}

//       <Routes>
//         {/* Define routes based on user roles */}
//         <Route path="/reception" element={role === 'reception' ? <ClientDetails /> : <Navigate to="/" />} />
//         <Route path="/psychology" element={role === 'psychology' ? <Psychology /> : <Navigate to="/" />} />
//         <Route path="/legal" element={role === 'legal' ? <ClientDetailsForm /> : <Navigate to="/" />} />
//         <Route path="/admin" element={role === 'admin' ? <Admin /> : <Navigate to="/" />} />
//         <Route path="/case" element={role !== 'reception' ? <Case /> : <Navigate to="/" />} />
//         {/* Default Route */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;














































