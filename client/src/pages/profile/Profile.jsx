import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css'
import axios from 'axios';

import {useUserContext} from '../../context/UserContext';
import { apiPath } from '@/utils/apiPath';
import PageLoading from '@/mycomponenrs/loading/PageLoading';

const Profile = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();
    const [pageLoading, setPageLoading] = useState(true);

    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();

    const getUserDetails = async() => {
        setPageLoading(true);
        try{
            const apipath = `${apiPath}/users/${userInfo.id}`;
            const response = await axios.get(apipath);
            setPageLoading(false);
            
            // console.log(response.data);
            if(response.data.message == "found user by id"){
                setUserId(response.data.user.id);
                setUserEmail(response.data.user.email);
                setUserName(response.data.user.name);
                // console.log(response.data.user);
            }
        }
        catch(error){
            setPageLoading(false);
            console.log(error.message);
        }
    }

    const handleEditProfile = () => {
        if(userId){
            const user = {
                id: userId,
                name: userName,
                email: userEmail,
            }
            navigate('edit', {state: {user} });
        }
    }

    const logout = async () => {        
        localStorage.setItem('hackInShellAccessToken', '');
        setUserInfo([]);
    }

    useEffect(() => {
        getUserDetails();
    }, []);


    useEffect(() => {
        if (Object.keys(userInfo).length == 0 && localStorage.getItem('hackInShellAccessToken') == '') {
            window.open("/", "_top");
        }
    }, [userInfo]);

    if(pageLoading){
        return (
            <div className='profile'>
                <PageLoading />
            </div>
        )
    }

  return (
    <>
        <div className='profile'>
            <div className='profile_mainBox'>
                    <div className='profile_card'>
                        <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSKfqwfoxSa-NfmfB-EhtFcj0gjxBThLhThTPH53yzm25d4eMzDxra8a61IFCqcF5NIh5foQA" />
                        <h2>{userInfo.name}</h2>
                        <h3>{userEmail}</h3>
                        <div className='flex flex-col'>
                            {userId? (<button onClick={()=>handleEditProfile()}>Edit Profile</button>) : (null) }
                            {userId? (<Link to='/auth/changepassword' className='profile_buttons'>Change Password</Link>) : (null) }
                            <button onClick={()=>logout()}>Logout</button>
                        </div>
                    </div>
            </div>
        </div>
       
    </>
  )
}

export default Profile