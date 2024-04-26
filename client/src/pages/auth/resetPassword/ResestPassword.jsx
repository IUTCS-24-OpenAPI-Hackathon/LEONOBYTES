import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '../../../context/UserContext';
import { apiPath } from '@/utils/apiPath';

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
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
        else if(token === "" || token == null || token === undefined){
            setLoginStatus("reset token is empty");
        }
        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/auth/reset-password/confirm`;
                const response = await axios.put(apipath, 
                {
                    email:email,
                    token: token,
                    password:password
                })
                //console.log(response);
                
                setLoginStatus(response.data.message);
                setButtonLoading(false);
                setEmail('');
                    setPassword('');
                    setToken('');
                if(response.data.message == 'Password reset successfull'){
                    navigate('/auth/login');
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


  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Reset password</h2>
            <Input type="text" placeholder="Insert email" value={email} onChange={(event) => {setEmail(event.target.value);}}/>
            <Input type="text" placeholder="Insert Token" value={token} onChange={(event) => {setToken(event.target.value);}}/>
            <Input type="text" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
            <p>{loginStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Reset'
                }
            </Button>
            <div className='flex flex-col'>
                <Link to='/auth/login' className='login_mainBox_link'>Remember Password?</Link>
                <Link to='/auth/forgotpassword' className='login_mainBox_link'>Forgot Password?</Link>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword