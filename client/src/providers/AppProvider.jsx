import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

// Verifying Users by Session Storage For the Shopping Cart
export function AppProvider(props) {
  const [currentUser, setCurrentUser] = useState()
  async function verifyUser() {
    const foundCookie = Cookies.get('auth-cookie')
    // console.log(foundCookie)
    if (foundCookie) {
      const response = await fetch('/api/users/verify')
      // console.log(response)
      if (!response.ok) {
        return setCurrentUser(null)
      }
      const foundUser = await response.json()
      console.log(foundUser)
      setCurrentUser(foundUser.payload)
    }
  }


  useEffect(() => {
    verifyUser()
  }, [])

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])


  return (
    <AppContext.Provider value={{ currentUser}}>
      {props.children}
    </AppContext.Provider>
  )
}
