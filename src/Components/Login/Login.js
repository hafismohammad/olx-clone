import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged In');
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
      setTimeout(() => {
        setError('');
      }, 3000);
      console.log('Login failed');
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   if (user ) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  return (
    <div className='flex min-h-screen h-full w-full items-center justify-center'>
      <div className='border-2 border-black h-5/6 w-1/4 p-8'>
        <div className='h-28 pt-4 flex items-center justify-center'>
          <img width="200px" height="200px" src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleLogin}>
          <div className='flex flex-col my-3'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Enter your e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 border-gray-500 rounded-md text-sm py-2 px-3'
            />
          </div>
          <div className='flex flex-col my-3'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border-2 border-gray-500 rounded-md text-sm py-2 px-3'
            />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          <div className='flex flex-col my-3'>
            <button
              type="submit"
              className='border-2 my-2 bg-gray-800 text-white py-2 font-bold tracking-widest transition ease-in-out delay-150 hover:bg-white hover:text-gray-800 hover:border-gray-800'
            >
              LOGIN
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className='font-semibold tracking-wide'
            >
              SIGNUP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
