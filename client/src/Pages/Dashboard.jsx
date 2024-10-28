import { Typography } from 'antd'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <Typography.Title level={6}>Dashboard</Typography.Title>
    <div className='statistics-container' >
      <div className='stat-card' >
        <h2>Customers</h2>
        <p>500</p>
        </div>
      
      <div className='stat-card' >
        <h2>Total Cases </h2>
        <p>150</p>
        </div>
      
      <div className='stat-card' >
        <h2>Today's Appointments</h2>
        <p>14</p>
      </div>
      
      <div className='stat-card' >
        <h2>Tasks</h2>
        <p>4</p>
        </div>
      
      </div>
      
    </div>
  )
}

export default Dashboard
