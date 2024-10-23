import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import FormControlsClient from '/src/components/FormControlsClient/FormControlsClient';
// import CasePriorityForm from '/src/components/CasePriorityForm/CasePriorityForm';
// import AppointmentForm from '/src/components/AppointmentForm/AppointmentForm';
import Login from '../../components/Auth/Login'
import Header from '../../components/Header/Header'
import './Home.css';
import axios from 'axios';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('');
  const [stats, setStats] = useState({
    totalClients: 0,
    totalCases: 0,
    totalImportantCases: 0,
    totalCompletedCases: 0,
  });

  useEffect(() => {
    // Fetch statistics on component mount client/src/assets/img_avatar.jpg
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats'); // Adjust API endpoint
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
          <aside className="sidebar">
        <div className="logos">LawOffice</div>
        <div className="welcome-user"><br /></div>
        <ul>
          <li onClick={() => setActiveComponent('stats')}>Dashboard</li>
          <li onClick={() => setActiveComponent('client')}>Client</li>
          <li onClick={() => setActiveComponent('case')}>Case</li>
          <li onClick={() => setActiveComponent('task')}>Task</li>
          <li onClick={() => setActiveComponent('appointment')}>Appointment</li>
          <li onClick={() => setActiveComponent('team')}>Team Members</li>
          {/* <li onClick={() => setActiveComponent('income')}>Income</li>
          <li onClick={() => setActiveComponent('vendor')}>Vendor</li> */}
          {/* <li onClick={() => setActiveComponent('expense')}>Expense</li> */}
          <li onClick={() => setActiveComponent('settings')}>Settings</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="dashboard-title">Dashboard</div>
          <div className="header-icons">
            <div className="notification-icon">🔔 13</div>
            <div className="user-info">
              <span>Super Admin</span> <img src='/src/assets/logo.png' alt="Profile" />
            </div>
          </div>
        </header>

        {activeComponent === 'stats' && (
          <div className="stats-container">
            <div className="stat-box">
              <p className="stat-count">{stats.totalClients}</p>
              <p>Total clients</p>
            </div>
            <div className="stat-box">
              <p className="stat-count">{stats.totalCases}</p>
              <p>Total cases</p>
            </div>
            <div className="stat-box">
              <p className="stat-count">{stats.totalImportantCases}</p>
              <p>Total important cases</p>
            </div>
            <div className="stat-box">
              <p className="stat-count">{stats.totalCompletedCases}</p>
              <p>Total completed cases</p>
            </div>
          </div>
        )}

        {activeComponent === 'client' && (
          <FormControlsClient select2Case="/get-client-data" date_format_datepiker="MM/dd/yyyy" token="your-csrf-token" />
        )}

        {activeComponent === 'case' && (
          <CasePriorityForm token="your-csrf-token" />
        )}

        {activeComponent === 'appointment' && (
          <AppointmentForm />
        )}
        <Login/>

        {/* Additional components can be added here for Task, Team Members, etc. */}

        {/* <div className="case-board">
          <div className="case-board-header">
            <h3>Case Board</h3>
            <div className="case-board-tools">
              <button>🖨️</button>
              <button>📋</button>
              <input type="date" value="2020-01-15" />
            </div>
          </div> */}
          {/* <div className="case-board-content">
            {/* Example case table */}
            {/* <h4>Judge, Family Court</h4>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Case No</th>
                  <th>Case</th>
                  <th>Next Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody> */}
                {/* Replace with dynamic data */}
                {/* <tr>
                  <td>1</td>
                  <td>12/2019</td>
                  <td>Darshan N Mehta VS Hetvi Vyas</td>
                  <td>24-01-2020</td>
                  <td>Argument</td>
                  <td>
                    <button>Next Date</button>
                    <button>Case Transfer</button>
                  </td>
                </tr>
              </tbody>
            </table> */}
            {/* Additional case tables can be added here */}
          {/* </div>  */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default Dashboard;






































// import React from 'react'
// import { Link } from 'react-router-dom'
// import './Home.css'
// import Header from '../../components/Header/Header'
// // import Login from '../../components/Auth/Login'

// function Home() {
//     return (
//         <div >
//             <Header />
//             <div className="container-flex">
//             <Link to="/client-list">View Clients</Link>
//             </div>
            

           
           
                
            
            
//         </div>
      
//   )
// }

// export default Home
// Dashboard.js
// src/components/Dashboard.js