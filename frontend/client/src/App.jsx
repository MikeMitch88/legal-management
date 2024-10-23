import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import ClientDetails from './pages/TotalClients/Reception'
import ClientDetailsForm from './pages/Cases/Legal'
import Login from './components/Auth/Login'
import Psychology from './pages/Psycho/psychology'
import Admin from './pages/Admin/Admin'
import ClientList from './pages/Client/ClientList'
// import Dashboard from './pages/Home/Home'




const App = () => {

  const [clients, setClients] = useState([]); // Your clients state here
  const [filteredClients, setFilteredClients] = useState(clients); // State for filtered clients

  


 
  const handleSearch = (searchTerm) => {
      if (searchTerm === '') {
          setFilteredClients(clients); // Reset to all clients if search term is empty
      } else {
          const filtered = clients.filter(client =>
              client.name.toLowerCase().includes(searchTerm.toLowerCase()) // Adjust based on your client structure
          );
          setFilteredClients(filtered);
      }
  };

  return (
    <div className='app'>

      {/* <Dashboard/> */}

      {/* <Navbar onSearch={handleSearch} /> */}
      {/* <ClientList clients={filteredClients} /> Render the filtered clients here */}
      {/* <Admin /> */}

  
      <Routes>
    
        <Route path='/' element={<Home /> } />
        <Route path='/reception' element={<ClientDetails />} />
        <Route path="/api/users/login" element={<Login />} />
        <Route path='/psychology' element={<Psychology />} />
        <Route path="/add" element={<Admin />} />
        <Route path='/client-list' element={<ClientList />} />
        
        <Route path='/legal' element={<ClientDetailsForm />} />
      
      </Routes>

    </div>
  )
}

export default App