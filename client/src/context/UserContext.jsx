// UserContext.js
import { checkUser } from '@/utils/checkUser';
import React, {createContext, useContext, useState, useEffect} from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState([]);
  
  const fetchData = () => {
    const user = checkUser();
    setUserInfo(user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};

