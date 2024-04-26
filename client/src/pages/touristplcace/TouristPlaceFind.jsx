import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '@/context/UserContext';
import { apiPath } from '@/utils/apiPath';

const TouristPlaceFind = () => {
  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Find Place</h2>
        </div>
    </div>
  )
}

export default TouristPlaceFind