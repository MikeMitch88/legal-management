
import { Menu } from 'antd'
import React from 'react'
import { AppstoreOutlined, CalendarOutlined, CalendarTwoTone, CheckSquareOutlined, CheckSquareTwoTone, FileTextFilled, FileTextOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const Navigate = useNavigate()
  return (
    <div className='SideMenu' >
        <Menu 
        onClick={(item) => {
          Navigate(item.key)
        }}
        items={[
          {
            label:'Dashboard',
            icon: <AppstoreOutlined />,
            key:'/',
          },
          {
            label:'Client',
            icon: <UserOutlined />,
            key:'/client',
          },
          {
            label:'Case',
            icon: <FileTextFilled/>,
            key:'/case',
          },
          {
            label:'Task',
            icon: <CheckSquareTwoTone />,
            key:'/task',
          },
          {
            label:'Appointment',
            icon: <CalendarTwoTone />,
            key:'/appointment',
          },
          {
            label:'Team Members',
            icon: <TeamOutlined />,
            key:'/teammembers',
          },
          {
            label:'Settings',
            icon: <SettingOutlined />,
            key:'/setting',
          },
        ]} >

        </Menu>
      
    </div>
  )
}

export default SideMenu




































































































































































// import { Menu } from 'antd';
// import React from 'react';
// import { AppstoreOutlined, UserOutlined, FileTextFilled, CheckSquareTwoTone, CalendarTwoTone, TeamOutlined, SettingOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';

// const SideMenu = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   let userRole;

//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       userRole = decodedToken.role; // Assuming the role is present in the decoded token
//     } catch (error) {
//       console.error("Invalid token:", error);
//     }
//   }

//   const menuItems = [
//     {
//       label: 'Dashboard',
//       icon: <AppstoreOutlined />,
//       key: '/',
//     },
//     {
//       label: 'Client',
//       icon: <UserOutlined />,
//       key: '/client',
//     },
//     {
//       label: 'Case',
//       icon: <FileTextFilled />,
//       key: '/case',
//     },
//     {
//       label: 'Task',
//       icon: <CheckSquareTwoTone />,
//       key: '/task',
//     },
//     {
//       label: 'Appointment',
//       icon: <CalendarTwoTone />,
//       key: '/appointment',
//     },
//     {
//       label: 'Team Members',
//       icon: <TeamOutlined />,
//       key: '/teammembers',
//       restrictedTo: ['admin'], // Only admin can see this
//     },
//     {
//       label: 'Settings',
//       icon: <SettingOutlined />,
//       key: '/setting',
//     },
//   ];

//   const filteredMenuItems = menuItems.filter(item => {
//     if (item.restrictedTo) {
//       return item.restrictedTo.includes(userRole);
//     }
//     return true; // Show item if no restrictions
//   });

//   return (
//     <div className='SideMenu'>
//       <Menu
//         onClick={(item) => {
//           navigate(item.key);
//         }}
//         items={filteredMenuItems.map(item => ({
//           label: item.label,
//           icon: item.icon,
//           key: item.key,
//         }))}>
//       </Menu>
//     </div>
//   );
// };

// export default SideMenu;























































































































































































































































// import { Menu } from 'antd';
// import React from 'react';
// import { 
//   AppstoreOutlined, 
//   CalendarTwoTone, 
//   CheckSquareTwoTone, 
//   FileTextFilled, 
//   SettingOutlined, 
//   TeamOutlined, 
//   UserOutlined 
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const SideMenu = ({ role }) => {
//   const navigate = useNavigate();

//   // Define the menu items based on user role
//   const menuItems = [
//     {
//       label: 'Dashboard',
//       icon: <AppstoreOutlined />,
//       key: '/',
//     },
//     {
//       label: 'Client',
//       icon: <UserOutlined />,
//       key: '/client',
//     },
//     // Show "Case" and "Appointment" only if the role is NOT 'reception'
//     ...(role !== 'reception' ? [
//       {
//         label: 'Case',
//         icon: <FileTextFilled />,
//         key: '/case',
//       },
//       {
//         label: 'Task',
//         icon: <CheckSquareTwoTone />,
//         key: '/task',
//       },
//       {
//         label: 'Appointment',
//         icon: <CalendarTwoTone />,
//         key: '/appointment',
//       }
//     ] : []),
//     // Show "Team Members" and "Settings" only if the role is 'admin'
//     ...(role === 'admin' ? [
//       {
//         label: 'Team Members',
//         icon: <TeamOutlined />,
//         key: '/teammembers',
//       },
//       {
//         label: 'Settings',
//         icon: <SettingOutlined />,
//         key: '/setting',
//       }
//     ] : []),
//   ];

//   return (
//     <div className='SideMenu'>
//       <Menu 
//         onClick={(item) => {
//           navigate(item.key);
//         }}
//         items={menuItems}
//       />
//     </div>
//   );
// };

// export default SideMenu;










































