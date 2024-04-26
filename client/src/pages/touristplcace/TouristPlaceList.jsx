import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '@/context/UserContext';
import { apiPath } from '@/utils/apiPath';

import { Button } from '@/components/ui/button';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';

const TouristPlaceList = () => {
    const location = useLocation();
  const { touristAttractions } = location.state;
  return (
    <>
        <NavigationBar />
        <div>
            {touristAttractions.map((places) => (
                <p>{places}</p>
            ))}
        </div>
    </>
  )
}

export default TouristPlaceList