import { Badge, Space, Typography } from 'antd'
import React, {useState} from 'react'
import { BellFilled, MailOutlined } from '@ant-design/icons';


const AppHeader = () => {
 
  

 
  
  return (
    
    <div className='AppHeader' >
      <img src='src/assets/image.png' />
      <Typography.Title>Relon's Dashboard</Typography.Title>

      <Space>
        <Badge count={10} dot>
        <MailOutlined style={{fontSize:24}} />
        </Badge>
        <Badge count={20} >
        <BellFilled style={{fontSize:24}} />
        </Badge>
      </Space>

        
    </div>
  )
}

export default AppHeader
