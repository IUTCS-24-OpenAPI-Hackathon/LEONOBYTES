import { Outlet, Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

import { checkLogin } from './checkLogin'
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import ChatHover from '@/pages/chathover/ChatHover';

const PrivateRoute = () => {
    let loggedIn = checkLogin();

    return(
        !loggedIn ? 
        <>
          <NavigationBar />
          <Outlet/> 
          {/* <ChatHover /> */}
          {/* <CopyRight/> */}
        </>
        : 
        <Navigate to="/login" />
    )
}

export default PrivateRoute