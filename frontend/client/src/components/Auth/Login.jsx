import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
//frontend/client/src/components/Auth/Login.css

function Login({ onLogin = ()=>{} }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming backend sends { token: "token_value", role: "user_role" } 
        localStorage.setItem('token', data.token);

        // Assuming `role` is part of the top-level response:
        const userRole = data.role;  // Access role directly from the response

        // Call the onLogin callback with the user's role
        onLogin(userRole);

        // Redirect based on user role
        if (userRole === 'admin') {
          navigate('/add');

        } else if (userRole === 'reception') {
          navigate('/reception');

        } else if (userRole === 'legal') {
          navigate('/legal');
          
        }else if (userRole === 'psychology') {
          navigate('/psychology');
          }
        else {
          navigate('/home');
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again later.');
    }
  };

  return (
    <>
      {/* <img src='/src/assets/logo.jpg' className='logo' alt='Logo' /> */}

      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleSubmit} className='form' >
        <div className='imgcontainer'>
          <img src='/src/assets/img_avatar.jpg' className='avatar' alt='Avatar' />
        </div>

        <div className='container'>
          <label htmlFor='email'><b>Email or Username</b></label>
          <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email or Username'
            id='email'
            name='email'
            required 
          />

          <label htmlFor='password'><b>Password</b></label>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            id='password'
            name='password'
            required 
          />

          <label>
            <input type='checkbox' name='remember' /> Remember Me
          </label>

          <button  type='submit'>Login</button>
        </div>

        <div className='container1'>
          <button type='button' className='cancelbtn'>Cancel</button>
          {/* <span className='psw'>Forgot <a href='#'>Password?</a></span> */}
        </div>
      </form>
    </>
  );
}

export default Login;
