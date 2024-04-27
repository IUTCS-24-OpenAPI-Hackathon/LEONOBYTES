import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import './Login.css'
import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '../../../context/UserContext';
import { apiPath } from '@/utils/apiPath';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/auth/login`;
                const response = await axios.post(apipath, 
                {
                    email:email,
                    password:password
                })
                //console.log(response);
                
                //setLoginStatus(response.data.message);
                setButtonLoading(false);
                // console.log(response.data);
                if(response.status == 200){
                    

                    
                    
                    //const userObj=response.data.user;
                    const userObj = [{
                        email: email,
                    }]
                    localStorage.setItem('hackInShellAccessToken', JSON.stringify(userObj));
                    setUserInfo(userObj);

                    setEmail('');
                    setPassword('');
                }
                else{
                    //
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
    
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length > 0) {
            navigate('/profile', { replace: true });
        }
    }, [userInfo]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const passwordInput = document.querySelector('input[type="password"]');
            if (passwordInput) {
                passwordInput.focus();
            }
        }
    };

  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Login User</h2>
            <Input type="text" placeholder="Insert email" value={email} onChange={(event) => {setEmail(event.target.value);}}
                onKeyDown={handleKeyPress}
            />
            <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        loginUser();
                    }
                }}
            />
            <p>{loginStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Login'
                }
            </Button>
            <Link to='/auth/signup' className='login_mainBox_link'>Dont have an account? Signup</Link>
        </div>
    </div>
  )
}

export default Login