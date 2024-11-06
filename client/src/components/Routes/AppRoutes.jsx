import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Client from '../../Pages/Client';
import Case from '../../Pages/Case';
import Task from '../../Pages/Task';
import Appointment from '../../Pages/Appointment';
import TeamMembers from '../../Pages/TeamMembers';
import Setting from '../../Pages/Setting';
import Login from '../Auth/Login';
import ClientDetails from '../ClientManagement/Reception';
import ClientDetailsForm from '../CaseManagement/Legal';
import Psychology from '../CaseManagement/Psychology';
import Admin from '../Admin/Admin';
import Protected from '../AuthContext/Protected';
import Unauthorized from '../AuthContext/Unauthorized';
import LogoutButton from '../Auth/Logout';

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true); // Update login state when user logs in  src/components/Auth/Logout.jsx
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update login state when user logs out
  };

  return (
    <>
      {/* Show LogoutButton only if logged in */}
      {isLoggedIn && <LogoutButton onLogout={handleLogout} />}

      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route
          path='/'
          element={
            <Protected roles={['admin', 'role']}>
              <Dashboard />
            </Protected>
          }
        />
        <Route path='client' element={<Protected roles={['admin', 'role']}><Client /></Protected>} />
        <Route path='case' element={<Protected roles={['admin', 'role']}><Case /></Protected>} />
        <Route path='task' element={<Protected roles={['admin', 'role']}><Task /></Protected>} />
        <Route path='appointment' element={<Protected roles={['admin', 'role']}><Appointment /></Protected>} />
        <Route path='teammembers' element={<Protected roles={['admin', 'role']}><TeamMembers /></Protected>} />
        <Route path='setting' element={<Protected roles={['admin', 'role']}><Setting /></Protected>} />
        <Route path='reception' element={<Protected roles={['reception']}><ClientDetails /></Protected>} />
        <Route path='legal' element={<Protected roles={['legal']}><ClientDetailsForm /></Protected>} />
        <Route path='psychology' element={<Protected roles={['psychology']}><Psychology /></Protected>} />
        <Route path='admin' element={<Protected roles={['admin']}><Admin /></Protected>} />
        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
};

export default AppRoutes;































































// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../../Pages/Dashboard';
// import Client from '../../Pages/Client';
// import Case from '../../Pages/Case';
// import Task from '../../Pages/Task';
// import Appointment from '../../Pages/Appointment';
// import TeamMembers from '../../Pages/TeamMembers';
// import Setting from '../../Pages/Setting';
// import Login from '../Auth/Login';
// import ClientDetails from '../ClientManagement/Reception';
// import ClientDetailsForm from '../CaseManagement/Legal';
// import Psychology from '../CaseManagement/Psychology';
// import Admin from '../Admin/Admin';
// import Protected from '../AuthContext/Protected';
// import Unauthorized from '../AuthContext/Unauthorized';

// const AppRoutes = () => (
//   <Routes>
//     <Route path='/login' element={<Login />} />
//     <Route
//       path='/'
//       element={
//         <Protected roles={['admin', 'role']}>
//           <Dashboard />
//         </Protected>
//       }
//     />
//     <Route path='client' element={<Protected roles={['admin', 'role']}><Client /></Protected>} />
//     <Route path='case' element={<Protected roles={['admin', 'role']}><Case /></Protected>} />
//     <Route path='task' element={<Protected roles={['admin', 'role']}><Task /></Protected>} />
//     <Route path='appointment' element={<Protected roles={['admin', 'role']}><Appointment /></Protected>} />
//     <Route path='teammembers' element={<Protected roles={['admin', 'role']}><TeamMembers /></Protected>} />
//     <Route path='setting' element={<Protected roles={['admin', 'role']}><Setting /></Protected>} />
//     <Route path='reception' element={<Protected roles={['reception']}><ClientDetails /></Protected>} />
//     <Route path='legal' element={<Protected roles={['legal']}><ClientDetailsForm /></Protected>} />
//     <Route path='psychology' element={<Protected roles={['psychology']}><Psychology /></Protected>} />
//     <Route path='admin' element={<Protected roles={['admin']}><Admin /></Protected>} />
//     <Route path='unauthorized' element={<Unauthorized />} />
//     <Route path='*' element={<Navigate to='/login' />} />
//   </Routes>
// );

// export default AppRoutes;





















































































































































































































// import { Routes, Route } from 'react-router-dom';
// import Dashboard from '../../Pages/Dashboard';
// import Client from '../../Pages/Client';
// import Case from '../../Pages/Case';
// import Task from '../../Pages/Task';
// import Appointment from '../../Pages/Appointment';
// import TeamMembers from '../../Pages/TeamMembers';
// import Setting from '../../Pages/Setting';
// import Login from '../Auth/Login';
// import ClientDetails from '../ClientManagement/Reception';
// import ClientDetailsForm from '../CaseManagement/Legal';
// import Psychology from '../CaseManagement/Psychology';
// import Admin from '../Admin/Admin';
// import PrivateRoute from '../AuthContext/Protected';
// import Unauthorized from '../AuthContext/Unauthorized';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/login' element={<Login />} />
//       <Route
//         path='/'
//         element={
//           <PrivateRoute roles={['admin', 'user', 'psychology', 'legal', 'reception']}>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       />
//       <Route path='/client' element={
//         <PrivateRoute roles={['admin', 'user', 'psychology', 'legal', 'reception']}>
//           <Client />
//         </PrivateRoute>
//       } />
//       <Route path='/case' element={
//         <PrivateRoute roles={['admin', 'psychology', 'legal']}>
//           <Case />
//         </PrivateRoute>
//       } />
//       <Route path='/task' element={
//         <PrivateRoute roles={['admin', 'psychology', 'legal']}>
//           <Task />
//         </PrivateRoute>
//       } />
//       <Route path='/appointment' element={
//         <PrivateRoute roles={['admin', 'psychology', 'legal']}>
//           <Appointment />
//         </PrivateRoute>
//       } />
//       <Route path='/teammembers' element={
//         <PrivateRoute roles={['admin']}>
//           <TeamMembers />
//         </PrivateRoute>
//       } />
//       <Route path='/setting' element={
//         <PrivateRoute roles={['admin', 'user', 'psychology', 'legal', 'reception']}>
//           <Setting />
//         </PrivateRoute>
//       } />
//       <Route path='/reception' element={
//         <PrivateRoute roles={['reception']}>
//           <ClientDetails />
//         </PrivateRoute>
//       } />
//       <Route path='/legal' element={
//         <PrivateRoute roles={['legal']}>
//           <ClientDetailsForm />
//         </PrivateRoute>
//       } />
//       <Route path='/psychology' element={
//         <PrivateRoute roles={['psychology']}>
//           <Psychology />
//         </PrivateRoute>
//       } />
//       <Route path='/admin' element={
//         <PrivateRoute roles={['admin']}>
//           <Admin />
//         </PrivateRoute>
//       } />
//       <Route path='/unauthorized' element={<Unauthorized />} />
//     </Routes>
//   );
// };

// export default AppRoutes;













































































// import { Routes, Route } from 'react-router-dom';
// import Dashboard from '../../Pages/Dashboard';
// import Client from '../../Pages/Client';
// import Case from '../../Pages/Case';
// import Task from '../../Pages/Task';
// import Appointment from '../../Pages/Appointment';
// import TeamMembers from '../../Pages/TeamMembers';
// import Setting from '../../Pages/Setting';
// import Login from '../Auth/Login';
// import ClientDetails from '../ClientManagement/Reception';
// import ClientDetailsForm from '../CaseManagement/Legal';
// import Psychology from '../CaseManagement/Psychology';
// import Admin from '../Admin/Admin';
// import PrivateRoute from '../AuthContext/Protected';
// import Unauthorized from '../AuthContext/Unauthorized';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/login' element={<Login />} />
//       <Route path='/unauthorized' element={<Unauthorized />} />

//       {/* Protected Routes */}
//       <Route
//         path='/'
//         element={
//           <PrivateRoute roles={['admin', 'user']}>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='client'
//         element={
//           <PrivateRoute roles={['admin', 'reception']}>
//             <Client />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='case'
//         element={
//           <PrivateRoute roles={['admin', 'user']}>
//             <Case />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='task'
//         element={
//           <PrivateRoute roles={['admin', 'user']}>
//             <Task />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='appointment'
//         element={
//           <PrivateRoute roles={['admin', 'receptionist']}>
//             <Appointment />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='teammembers'
//         element={
//           <PrivateRoute roles={['admin']}>
//             <TeamMembers />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='setting'
//         element={
//           <PrivateRoute roles={['admin', 'user']}>
//             <Setting />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='reception'
//         element={
//           <PrivateRoute roles={['receptionist']}>
//             <ClientDetails />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='legal'
//         element={
//           <PrivateRoute roles={['admin', 'user']}>
//             <ClientDetailsForm />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='psychology'
//         element={
//           <PrivateRoute roles={['admin', 'user']}>
//             <Psychology />
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path='admin'
//         element={
//           <PrivateRoute roles={['admin']}>
//             <Admin />
//           </PrivateRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;





































































































































// import { Routes, Route } from 'react-router-dom';
// import Dashboard from '../../Pages/Dashboard';
// import Client from '../../Pages/Client';
// import Case from '../../Pages/Case';
// import Task from '../../Pages/Task';
// import Appointment from '../../Pages/Appointment';
// import TeamMembers from '../../Pages/TeamMembers';
// import Setting from '../../Pages/Setting';
// import Login from '../Auth/Login';
// import ClientDetails from '../ClientManagement/Reception';
// import ClientDetailsForm from '../CaseManagement/Legal';
// import Psychology from '../CaseManagement/Psychology';
// import Admin from '../Admin/Admin';
// import PrivateRoute from '../AuthContext/Protected';
// import Unauthorized from '../AuthContext/Unauthorized';


// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/login' element={<Login />} />
//       <Route
//         path='/'
//         element={
//           <PrivateRoute roles={['admin', 'user']}>
//             <Dashboard />
//           </PrivateRoute>
//         }
//       />
//       <Route path='client' element={<Client />} />
//       <Route path='case' element={<Case />} />
//       <Route path='task' element={<Task />} />
//       <Route path='appointment' element={<Appointment />} />
//       <Route path='teammembers' element={<TeamMembers />} />
//       <Route path='setting' element={<Setting />} />
//       <Route path='reception' element={<ClientDetails />} />
//       <Route path='legal' element={<ClientDetailsForm />} />
//       <Route path='psychology' element={<Psychology />} />
//       <Route path='admin' element={<Admin />} />
//       <Route path='unauthorized' element={<Unauthorized />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
