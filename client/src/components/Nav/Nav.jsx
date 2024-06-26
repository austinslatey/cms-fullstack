import React from "react"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useAppContext } from "../../providers/AppProvider"
import Cookie from "js-cookie"


export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(false)
  const { currentUser } = useAppContext();
  function logout() {
    Cookie.remove('auth-cookie')
    window.location.href = '/'
  }


  // json.parse session storage
  useEffect(() => {
    // console.log(currentUser)
    currentUser && setLoggedIn(true)
  }, [currentUser])


  return (
    <nav>
      {/* Home tab */}
      <NavLink className="navbar" to="/" style={({ isActive }) => {
        return isActive ? { textDecoration: 'underline' } : {};
      }}>Home</NavLink>

      <NavLink className="navbar" to="/about" style={({ isActive }) => {
        return isActive ? { textDecoration: 'underline' } : {};
      }}>About</NavLink>




      {/* if else for displaying sign up/login tab */}
      {(!loggedIn) ? (
        <>
          {/* Signup tab */}
          <NavLink className="navbar" to="/login" style={({ isActive }) => {
            return isActive ? { textDecoration: 'underline' } : {};
          }}>Login</NavLink>
          <NavLink className="navbar" to="/signup" style={({ isActive }) => {
            return isActive ? { textDecoration: 'underline' } : {};
          }}>Sign up</NavLink>

        </>
      ) : (
        <>
          {/* Profile tab */}
          <NavLink className="navbar" to="/profile" style={({ isActive }) => {
            return isActive ? { textDecoration: 'underline' } : {};
          }}>Your Account</NavLink>
          {/* Logout button */}
          <span className="logout" onClick={logout}>Logout</span>
        </>
      )}
    </nav >
  )
}