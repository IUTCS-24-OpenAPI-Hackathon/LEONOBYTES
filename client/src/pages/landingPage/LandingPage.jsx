import React from 'react'
import Heromain from './heromain/Heromain';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import CopyRight from '@/mycomponenrs/copyright/CopyRight';
import ChatHover from '../chathover/ChatHover';
const LandingPage = () => {
  return (
    <>
        <NavigationBar/>
        <Heromain/>
        <CopyRight />
        {/* <ChatHover /> */}
    </>
  )
}

export default LandingPage