import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        };

        // Initial check
        checkLoginStatus();

        return () => {
            // Cleanup if needed
        };
    }, []);

    const handleLogout = () => {
        // Clear JWT token from local storage
        localStorage.removeItem('token');
        
        // Notify parent component about logout
        onLogout();
        
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div className='logout-btn' >
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default LogoutButton;


















































































































// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const LogoutButton = () => {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

//     useEffect(() => {
//         // Check if the user is logged in based on the token in local storage
//         setIsLoggedIn(!!localStorage.getItem('token'));
//     }, []);

//     const handleLogout = () => {
//         // Clear JWT token from local storage or state
//         localStorage.removeItem('token');
        
//         // Update login state
//         setIsLoggedIn(false);

//         // Redirect to the login page
//         navigate('/login');
//     };

//     return (
//         <>
//             {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
//         </>
//     );
// };

// export default LogoutButton;
