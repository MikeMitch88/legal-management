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










































