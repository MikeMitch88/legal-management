import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


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
        // Assuming backend sends { token: "token_value", role: "user_role" } src/assets/logo2.svg
        localStorage.setItem('token', data.token);
        localStorage.setItem("role", data.role); 

        // Assuming role is part of the top-level response:
        const userRole = data.role;  // Access role directly from the response

        // Call the onLogin callback with the user's role
        onLogin(userRole);

        // Redirect based on user role
        if (userRole === 'admin') {
          navigate('/admin');

        } else if (userRole === 'reception') {
          navigate('/reception');

        } else if (userRole === 'legal') {
          navigate('/legal');
          
        }else if (userRole === 'psychology') {


          navigate('/psychology');
          }
        else {
          navigate('/');
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
       <div className='flex-container' >
      <img className='logo' src='/src/assets/logo2.svg' alt='Logo' />

      <div className='form-container'>
      <div className='login-title'>
        <h1>Login</h1>
      </div>
      
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
        
        </div>
      </form>
    </div >
    </div>
     
    </>
  );
}

export default Login;































































































































































































































































































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login({ onLogin = () => {} }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://127.0.0.1:5000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const { token, role } = data;

//         if (token && role) {
//           localStorage.setItem('token', token);
//           if (typeof onLogin === 'function') onLogin(role);

//           switch (role) {
//             case 'admin':
//               navigate('/admin');
//               break;
//             case 'reception':
//               navigate('/reception');
//               break;
//             case 'legal':
//               navigate('/legal');
//               break;
//             case 'psychology':
//               navigate('/psychology');
//               break;
//             default:
//               navigate('/');
//           }
//         } else {
//           alert("Login failed: missing token or role.");
//         }
//       } else {
//         alert('Invalid email or password.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('Login failed. Please try again later.');
//     }
//   };

//   return (
//     <div className='flex-container'>
//       <img className='logo' src='/src/assets/logo2.svg' alt='Logo' />
//       <div className='form-container'>
//         <div className='login-title'>
//           <h1>Login</h1>
//         </div>
//         <form onSubmit={handleSubmit} className='form'>
//           <div className='imgcontainer'>
//             <img src='/src/assets/img_avatar.jpg' className='avatar' alt='Avatar' />
//           </div>
//           <div className='container'>
//             <label htmlFor='email'><b>Email or Username</b></label>
//             <input 
//               type='email'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder='Enter Email or Username'
//               id='email'
//               name='email'
//               required 
//             />

//             <label htmlFor='password'><b>Password</b></label>
//             <input 
//               type='password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder='Enter Password'
//               id='password'
//               name='password'
//               required 
//             />

//             <label>
//               <input type='checkbox' name='remember' /> Remember Me
//             </label>

//             <button type='submit'>Login</button>
//           </div>
//           <div className='container1'>
//             <button type='button' className='cancelbtn'>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



























































































































































































// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';


// function Login({ onLogin = ()=>{} }) {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch('http://127.0.0.1:5000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       console.log("Response Status:", response.status);  // Confirm status is 200
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Response Data:", data);  // Log the entire response data
  
//         // Check for token and role in the response
//         if (data.token && data.role) {
//           localStorage.setItem('token', data.token);
//           const userRole = data.role;
  
//           // Redirect based on user role
//           switch (userRole) {
//             case 'admin':
//               navigate('/admin');
//               break;
//             case 'reception':
//               navigate('/reception');
//               break;
//             case 'legal':
//               navigate('/legal');
//               break;
//             case 'psychology':
//               navigate('/psychology');
//               break;
//             default:
//               navigate('/');
//           }
//         } else {
//           console.error("Error: Missing token or role in response.");
//           alert("Login failed: missing token or role.");
//         }
//       } else {
//         console.error("Error: Response not OK, status:", response.status);
//         alert('Invalid email or password.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('Login failed. Please try again later.');
//     }
//   };
  
//   return (
//     <>
//        <div className='flex-container' >
//       <img className='logo' src='/src/assets/logo2.svg' alt='Logo' />

//       <div className='form-container'>
//       <div className='login-title'>
//         <h1>Login</h1>
//       </div>
      
//       <form onSubmit={handleSubmit} className='form' >
//         <div className='imgcontainer'>
//           <img src='/src/assets/img_avatar.jpg' className='avatar' alt='Avatar' />
//         </div>

//         <div className='container'>
//           <label htmlFor='email'><b>Email or Username</b></label>
//           <input 
//             type='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder='Enter Email or Username'
//             id='email'
//             name='email'
//             required 
//           />

//           <label htmlFor='password'><b>Password</b></label>
//           <input 
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder='Enter Password'
//             id='password'
//             name='password'
//             required 
//           />

//           <label>
//             <input type='checkbox' name='remember' /> Remember Me
//           </label>

//           <button  type='submit'>Login</button>
//         </div>

//         <div className='container1'>
//           <button type='button' className='cancelbtn'>Cancel</button>
        
//         </div>
//       </form>
//     </div >
//     </div>
     
//     </>
//   );
// }

// export default Login;








































































// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login({ onLogin = () => {} }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://127.0.0.1:5000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // Store token and role from the response
//         const userToken = data.token;
//         const userRole = data.role;

//         localStorage.setItem('token', userToken);
//         localStorage.setItem('role', userRole);

//         // Pass token and role back to the parent App component
//         onLogin(userRole, userToken);

//         // Navigate based on role
//         if (userRole === 'admin') {
//           navigate('/admin');
//         } else if (userRole === 'reception') {
//           navigate('/reception');
//         } else if (userRole === 'legal') {
//           navigate('/legal');
//         } else if (userRole === 'psychology') {
//           navigate('/psychology');
//         } else {
//           navigate('/');
//         }
//       } else {
//         alert('Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('Login failed. Please try again later.');
//     }
//   };

//   return (
//     <div className='flex-container'>
//       <img className='logo' src='/src/assets/logo2.svg' alt='Logo' />
//       <div className='form-container'>
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit} className='form'>
//           <label htmlFor='email'>Email or Username</label>
//           <input 
//             type='email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder='Enter Email or Username'
//             required 
//           />
//           <label htmlFor='password'>Password</label>
//           <input 
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder='Enter Password'
//             required 
//           />
//           <button type='submit'>Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;