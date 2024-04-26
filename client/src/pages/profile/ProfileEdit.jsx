import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { apiPath } from '@/utils/apiPath';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import ButtonLoading from '@/mycomponenrs/loading/Loading';
import PageLoading from '@/mycomponenrs/loading/PageLoading';

const ProfileEdit = () => {
    const location = useLocation();
    const { user } = location.state;

    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [updateStatus, setUpdateStatus] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const getUserDetails = () => {
        setUserName(user.name);
        setUserEmail(user.email);
        setPageLoading(false);
    }

    const updateUserDetails = async() => {
      setButtonLoading(true);
      try{
          const apipath = `${apiPath}/users/${user.id}`;
          const response = await axios.put(apipath,{
            name:userName,
            email:userEmail,
          });

          setButtonLoading(false);
          if(response.data.message == "User Profile updated"){
            setUpdateStatus("User profile updated");
            console.log(response.data.user);
            navigate('/profile', { replace: true });
          }

        }
        catch(error){
          setButtonLoading(false);
          if(error.response.status == 404){
            setUpdateStatus(error.response.data.message);
          }
          else{
            setUpdateStatus(error.message);
          }
          console.log(error.message);
        }
    }

    useEffect(()=>{
        getUserDetails();
    }, [])

    if(pageLoading){
      return(
        <div className='h-[80vh]'>
          <PageLoading/>
        </div>
      )
    }
  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2 className='text-white text-center text-[2vw] m-2'>Update User</h2>
            <label>Name: </label>
            <Input type="text" placeholder="Insert Username" value={userName} onChange={(event) => {setUserName(event.target.value);}}/>
            <label>Email: </label>
            <Input type="email" placeholder="Insert Email" value={userEmail} onChange={(event) => {setUserEmail(event.target.value);}}/>
            
            <p className='text-center text-red-600 p-[1vw]'>{updateStatus}</p>
            <Button variant="outline" className='w-[100%]' onClick={()=>updateUserDetails()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Save'
                }
            </Button>
        </div>
    </div>
  )
}

export default ProfileEdit