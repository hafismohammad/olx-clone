import React, { useEffect, useContext } from 'react';
import './App.css';
import Home from './Pages/Home'; 
import Signup from './Pages/Signup'; 
import Login from './Components/Login/Login';
import Create from './Components/Create/Create'
import View from './Pages/ViewPost'
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Post from './store/postContext'

function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

    });

    return () => unsubscribe();
  }, [auth, setUser]);

  return (
    <div>
      <Post>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path='/create' element={<Create/>} />
          <Route path='/view' element={<View/>} />
        </Routes>
      </BrowserRouter>
      </Post>   
    </div>
  );
}

export default App;
