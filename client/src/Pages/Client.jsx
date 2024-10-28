import { Typography } from 'antd'
import React from 'react'
import ClientList from '../components/ListClients/ClientList'

const Client = () => {
  return (
    <div>
      <Typography.Title level={6}>Clients</Typography.Title>

    <div>
    <ClientList />
    </div>
      
    </div>
    
  )
}

export default Client
