import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '../../../context/UserContext';
import { apiPath } from '@/utils/apiPath';

const ChangePassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [token, setToken] = useState("");
    const [givenToken, setGivenToken] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const loginUser = async () => {         
        setLoginStatus("");
        if(email === "" || email == null || email === undefined){
            setLoginStatus("Email is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setLoginStatus("password is empty");
        }
        else if(newPassword === "" || newPassword == null || newPassword === undefined){
            setLoginStatus("new password is empty");
        }
        else if(token === "" || token == null || token === undefined){
            setLoginStatus("token is empty");
        }
        else if(token != givenToken){
            setLoginStatus("token doesn't match");
        }
        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/auth/change-password`;
                const response = await axios.put(apipath, 
                {
                    email:email,
                    password:password,
                    newPassword: newPassword,
                })
                //console.log(response);
                
                setLoginStatus(response.data.message);
                setButtonLoading(false);
                setEmail('');
                setPassword('');
                setNewPassword('');
                setToken('');
                
                if(response.data.message == 'Password change successfull'){
                    navigate('/profile');
                }
            }
            catch(error){
                //console.log(error.response);
                setButtonLoading(false);
                if(error.response.status == 401){
                    setLoginStatus(error.response.data.message);
                }
                else setLoginStatus(error.message);
            };
        }
    };

    const generateRandomToken = (length) =>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
    
        for (let i = 0; i < length; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        return token;
    }

    useEffect(()=>{
        const randomNo = generateRandomToken(10);
        setGivenToken(randomNo);

        // Set a timeout to change the token after 5 minutes
        const timeoutId = setTimeout(() => {
            const newRandomNo = generateRandomToken(10);
            setGivenToken(newRandomNo);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Clear the timeout to prevent memory leaks
        return () => clearTimeout(timeoutId);
    },[]);


  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Reset password</h2>
            <Input type="text" placeholder="Insert email" value={email} onChange={(event) => {setEmail(event.target.value);}}/>
            <Input type="text" placeholder="Insert Token" value={token} onChange={(event) => {setToken(event.target.value);}}/>
            <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
            <Input type="password" placeholder="Insert New Password" value={newPassword} onChange={(event) => {setNewPassword(event.target.value);}}/>
            <p>{loginStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Change'
                }
            </Button>
        </div>
    </div>
  )
}

export default ChangePassword