import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

export function AppProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);

  async function verifyUser() {
    const foundCookie = Cookies.get('auth-cookie');
    console.log('Found cookie:', foundCookie);

    if (foundCookie) {
      const response = await fetch('/api/users/verify');
      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error('Error verifying user:', response.statusText);
        return setCurrentUser(null);
      }

      const foundUser = await response.json();
      console.log('Found user:', foundUser);

      setCurrentUser(foundUser.payload);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    console.log('Current user:', currentUser);
  }, [currentUser]);

  return (
    <AppContext.Provider value={{ currentUser }}>
      {props.children}
    </AppContext.Provider>
  );
}
