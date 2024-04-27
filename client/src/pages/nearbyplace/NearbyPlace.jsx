import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import { apiPath } from '@/utils/apiPath';

const NearbyPlace = () => {
    const [currentLocation, setCurrentLocation] = useState("");
    const [radius, setRadius] = useState("");
  return (
    <div>NearbyPlace</div>
  )
}

export default NearbyPlace