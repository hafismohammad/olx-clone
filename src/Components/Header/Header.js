import React,{useContext, useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { SearchContext } from '../../store/SearchContext';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from "react-router-dom";


function Header() {

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext); 
  const { user, setUser } = useContext(AuthContext); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); 
      navigate('/login')
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const hadleSell = () => {
     if(user) {
      navigate('/create')

     }else {
      navigate('login')
     }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div  className="input">
            <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span >{user ? `welcome ${user.displayName}` :  <Link to="/login">Login</Link>} </span>
          <hr />
        </div>
        { user && <span onClick={handleLogout} >Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={hadleSell}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
