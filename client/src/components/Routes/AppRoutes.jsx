import { Routes, Route } from 'react-router-dom';
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
import PrivateRoute from '../AuthContext/Protected';
import Unauthorized from '../AuthContext/Unauthorized';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={
          <PrivateRoute roles={['admin', 'user']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path='client' element={<Client />} />
      <Route path='case' element={<Case />} />
      <Route path='task' element={<Task />} />
      <Route path='appointment' element={<Appointment />} />
      <Route path='teammembers' element={<TeamMembers />} />
      <Route path='setting' element={<Setting />} />
      <Route path='reception' element={<ClientDetails />} />
      <Route path='legal' element={<ClientDetailsForm />} />
      <Route path='psychology' element={<Psychology />} />
      <Route path='admin' element={<Admin />} />
      <Route path='unauthorized' element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
