import React, { useState, useEffect } from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css'
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/create/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import Profile from './pages/profile/Profile';
import {useUserContext, UserProvider} from './context/UserContext';

import { checkLogin } from './utils/checkLogin';
import PrivateRoute from './utils/PrivateRoute';
import Forgot from './pages/auth/forgot/Forgot';
import ResetPassword from './pages/auth/resetPassword/ResestPassword';
import ChangePassword from './pages/auth/changePassword/ChangePassword';
import ProfileEdit from './pages/profile/ProfileEdit';
import Chats from './pages/chats/Chats';
import Chatbot from './pages/chatbot/ChatBot';
import ChatHover from './pages/chathover/ChatHover';
import TouristPlace from './pages/touristplcace/TouristPlace';
import TouristPlaceFind from './pages/touristplcace/TouristPlaceFind';
import TouristPlaceFindCountry from './pages/touristplcace/TouristPlaceFindCountry';
import TouristPlaceList from './pages/touristplcace/TouristPlaceList';
import TouristPlaceDescription from './pages/touristplcace/TouristPlaceDescription';

const App = () => {
  const NotLoggedIn = checkLogin();

  return (
    <>
      
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={ <LandingPage />} exact/>
            <Route path="/auth/login" element={NotLoggedIn ? <Login /> : <Navigate to="/profile" replace />} />
            <Route path="/auth/signup" element={NotLoggedIn ? <Signup /> : <Navigate to="/profile" replace />} />
            
            <Route path="/auth/forgotpassword" element={NotLoggedIn ? <Forgot /> : <Navigate to="/profile" replace />} />
            <Route path="/auth/resetpassword" element={NotLoggedIn ? <ResetPassword /> : <Navigate to="/profile" replace />} />
            <Route path="/chathover" element={<ChatHover/>} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/place/find" element={<TouristPlaceFind />} />
            <Route path="/place/list" element={<TouristPlaceList />} />
            <Route path="/place/suggestions" element={<TouristPlace />} />
            <Route path="/place/description" element={<TouristPlaceDescription />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile/>} />
              <Route path="/profile/edit" element={<ProfileEdit/>} />
              <Route path="/auth/changepassword" element={<ChangePassword />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chatbot" element={ <Chatbot />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
      

    </>
  )
}

export default App