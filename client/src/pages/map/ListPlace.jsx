import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '@/context/UserContext';
import { apiPath } from '@/utils/apiPath';

import { Button } from '@/components/ui/button';

import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import PageLoading from '@/mycomponenrs/loading/PageLoading';

const ListPlace = () => {
    const location = useLocation();
    const { amenity } = location.state;

    const[pageLoading, setPageLoading] = useState(false);
    const[buttonLoading, setButtonLoading] = useState(false);

    const [markers, setMarkers] = useState([]);
    const [allData, setAllData] = useState([]);

    const leonobytesStateName = localStorage.getItem('leonobytesstatename');

    const getMarkers = async() => {
        setPageLoading(true);
        try{
            const Apipath = `${apiPath}/amenities`;
            const response = await axios.post(Apipath,{
                location_name: leonobytesStateName,
                amenties: amenity,
                radius: 10000,
            });
            console.log(response.data);
            setPageLoading(false);
            if(response.status == 200){
                //console.log(response.data);
                const allLocations = Object.values(response.data.locations).flat();
                setMarkers(allLocations);
                setAllData(response.data)
            }  
            else {
              //
            }
        }
        catch(error){
          setPageLoading(false);
          console.log(error.message);
        }
    }

    useEffect(()=>{
        getMarkers();
    }, []);

    if(pageLoading){
        return(
            <PageLoading />
        )
    }
  return (
    <>
        <NavigationBar />
        <div className='touristplacelist'>
          <div className='touristplacelist_mainBox'>
          <h1>Nearby {amenity[0]}</h1>
            <div className='touristplace_cardBox'>
                {markers && markers.map((marker, index) => (
                    <div key={index} className='touristplace_cards'>
                        <img src="https://plainbackground.com/plain1024/87c560.png" alt={marker.name} />
                        <div className='touristplace_cards_textBox'>
                            <h2>{marker.name}</h2>
                            <Button><a
                                href={`https://www.google.com/maps/?q=${marker.latitude},${marker.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Details
                            </a>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default ListPlace