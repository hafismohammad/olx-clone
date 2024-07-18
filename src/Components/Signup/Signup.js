import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext, AuthContext } from "../../store/FirebaseContext";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { auth, firestore } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();



  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !phone || !password) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (/^-/.test(username)) {
      setError('Username cannot be a negative number');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (parseInt(phone) < 0 || phone.length !== 10) {
      setError('Please enter a valid phone number');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError('Password must contain at least one special character.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: username });
      await addDoc(collection(firestore, 'users'), {
        id: result.user.uid,
        username: username,
        phone: phone
      });
      setLoading(false);
      navigate('/login');
      console.log('User created successfully');
    } catch (error) {
      setLoading(false);
      setError('User already exists');
      console.error('Error creating user:', error.message);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate('/');
  //   }
  // }, [user, navigate]);

  return (
    <div className='flex min-h-screen h-full items-center justify-center'>
      <div className='border-2 border-black h-5/6 w-1/4 p-8'>
        <div className='h-28 pt-4 flex items-center justify-center'>
          <img width="200px" height="200px" src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleSignup}>
          <div className='flex flex-col my-3'>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              placeholder='Enter your name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border-2 border-gray-500 rounded-md text-sm py-2 px-3'
            />
          </div>
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
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder='Enter your phone number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex flex-col my-3'>
              <button
                type='submit'
                className='border-2 my-2 bg-gray-800 text-white py-2 font-bold tracking-widest transition ease-in-out delay-150 hover:bg-white hover:text-gray-800 hover:border-gray-800'
              >
                SIGNUP
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className='font-semibold tracking-wide'
              >
                LOGIN
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
