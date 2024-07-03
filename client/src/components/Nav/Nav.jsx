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
      <NavLink className="navbar" to="/"
        style={({ isActive }) =>
        ({ textDecoration: isActive ? 'underline' : 'none' }
        )}>Home</NavLink>
      <NavLink className="navbar" to="/about"
        style={({ isActive }) =>
        ({ textDecoration: isActive ? 'underline' : 'none' }
        )}>About</NavLink>

      {/* if else for displaying sign up/login tab */}
      {(!loggedIn) ? (
        <>
          {/* Signup tab */}
          <NavLink className="navbar" to="/login" style={({ isActive }) =>
          ({ textDecoration: isActive ? 'underline' : 'none' }
          )}>Login</NavLink>
          <NavLink className="navbar" to="/signup" style={({ isActive }) =>
          ({ textDecoration: isActive ? 'underline' : 'none' }
          )}>Sign up</NavLink>

        </>
      ) : (
        <>
          {/* Profile tab */}
          <NavLink className="navbar" to="/usersettings" style={({ isActive }) =>
          ({ textDecoration: isActive ? 'underline' : 'none' }
          )}>Your Account</NavLink>
          {/* Logout button */}
          <span className="logout" onClick={logout}>Logout</span>
        </>
      )}
    </nav >
  )
}