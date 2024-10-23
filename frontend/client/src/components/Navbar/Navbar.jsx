import React, {useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Navbar({onSearch}) {
    
    const [menu, setMenu] = useState('')
    const [isAdmin, setIsAdmin] = useState(false); // State for admin privileges
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleProfileClick = () => {
        setIsAdmin(true);
        navigate('/api/users/login');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); 
    };

    return (

        <div className='navbar'>
            <img src='/src/assets/logo.png' alt='logo' className='logo' />
            <ul className='navbar-menu'>
                <li onClick={()=>setMenu('home')} className={menu==='home'?'active':''}> <Link to='/'> Dashboard</Link> </li>
                <li onClick={()=>setMenu('reception')} className={menu==='reception'?'active':''}><Link to='/api/users/login' > Reception </Link> </li>
                <li onClick={()=>setMenu('psychology')} className={menu==='psychology'?'active':''}> <Link to='/api/users/login'> Psychology</Link> </li>
                <li onClick={()=>setMenu('paralegal')} className={menu==='paralegal'?'active':''}> <Link to='/api/users/login'> Paralegal</Link></li>
                <li onClick={() => setMenu('legal')} className={menu === 'legal' ? 'active' : ''}> <Link to='/api/users/login'> Legal</Link></li>
                {/* <li onClick = {() => navigate('/api/users/login')} >Legal</li> */}
            </ul>
            <div className="nav-bar">
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search clients/cases..."
                    />

                </div>
                <div className="profile" onClick={handleProfileClick} >
                    <img src='/src/assets/profile2.png' alt='profile' />
                    <div className="dot"></div>
                    
                </div>
            </div>
            
        </div>
      
  )
}

export default Navbar