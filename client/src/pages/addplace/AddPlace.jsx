import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import { apiPath } from '@/utils/apiPath';

const AddPlace = () => {
    const navigate = useNavigate();
    const [buttonLoading, setButtonLoading] = useState(false)
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handlePlaceCreate = async () => {
        try{
            const apipath = `${apiPath}/places`;
            const response = await axios.post(apipath, 
            {
                place_id: name,
                name: name,
                description: description,
                image: image,
            })

            if(response.data.message == "Data inserted successfully"){
                navigate('/', { replace: true });
            }
        }
        catch(error){
            console.log(error.response);
            setButtonLoading(false);
            
        };
    }
  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Add place</h2>
            <Input type="text" placeholder="Name" value={name} onChange={(event) => {setName(event.target.value);}}/>
            <Input type="text" placeholder="Image link" value={image} onChange={(event) => {setImage(event.target.value);}}/>
            <textarea type="text" placeholder="Description" value={description} onChange={(event) => {setDescription(event.target.value);}}
            className='w-[100%] h-[10vw] mt-[1.5vw] mb-[1.5vw] text-3xl p-[1vw]'/>
            
            <Button variant="outline" onClick={()=>handlePlaceCreate()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Create'
                }
            </Button>
        </div>
    </div>
  )
}

export default AddPlace