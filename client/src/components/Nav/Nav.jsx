import { NavLink } from "react-router-dom";
import { Buffer } from 'buffer';
import homeImg from "../../assets/home.png";
import defaultImg from "../../assets/avi.png";
import '../Header/Header.css'

import { useEffect, useState } from 'react';
import { useAppContext } from "../../providers/AppProvider";
import Cookie from "js-cookie";

export default function Nav({ avatar = {} }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { currentUser } = useAppContext();

  function logout() {
    Cookie.remove('auth-cookie');
    window.location.href = '/';
  }

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    }
  }, [currentUser]);

  return (
    <nav>
      {/* Home tab */}
      <NavLink className="navbar" to="/" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
        <img src={homeImg} alt="home" className="rounded nav-avatar" />
      </NavLink>

      {/* Profile tab with avatar */}
      <NavLink className="navbar" to="/about" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
        {avatar.data && avatar.contentType ? (
          <img
            src={`data:${avatar.contentType};base64,${Buffer.from(avatar.data).toString('base64')}`}
            alt="Profile"
            className="rounded nav-avatar"
          />
        ) : (
          <img
            src={defaultImg}
            alt="Default Profile"
            className="rounded nav-avatar"
          />
        )}
      </NavLink>

      {/* Login/Signup or Account/Logout tabs */}
      {!loggedIn ? (
        <>
          <NavLink className="navbar" to="/login" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            Login
          </NavLink>
          <NavLink className="navbar" to="/signup" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            Sign up
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="navbar" to="/usersettings" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>
            Your Account
          </NavLink>
          <span className="logout" onClick={logout}>Logout</span>
        </>
      )}
    </nav>
  );
}
