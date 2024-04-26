import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '../../../context/UserContext';
import { apiPath } from '@/utils/apiPath';

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const loginUser = async () => {         
        setLoginStatus("");
        if(email === "" || email == null || email === undefined){
            setLoginStatus("Email is empty");
        }
        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/auth/reset-password/initiate`;
                const response = await axios.post(apipath, 
                {
                    email:email,
                })
                //console.log(response);
                
                setLoginStatus(response.data.message);
                setButtonLoading(false);
                setEmail('');
                if(response.data.message == 'reset token sent to mail'){
                    navigate('/auth/resetpassword');
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
            <h2>Forgot password</h2>
            <Input type="text" placeholder="Insert email" value={email} onChange={(event) => {setEmail(event.target.value);}}/>
            <p>{loginStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Forgot'
                }
            </Button>
            <div className='flex flex-col'>
                <Link to='/auth/login' className='login_mainBox_link'>Remember Password?</Link>
                <Link to='/auth/resetpassword' className='login_mainBox_link'>Reset Password?</Link>
            </div>
        </div>
    </div>
  )
}

export default Forgot