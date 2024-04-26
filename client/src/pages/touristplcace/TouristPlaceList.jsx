import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '@/context/UserContext';
import { apiPath } from '@/utils/apiPath';

import { Button } from '@/components/ui/button';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import './TouristPlaceList.css'

const TouristPlaceList = () => {
    const location = useLocation();
    const { touristAttractions } = location.state;
  return (
    <>
        <NavigationBar />
        <div className='touristplacelist'>
          <div className='touristplacelist_mainBox'>
          <h1>Tourist Place</h1>
            {/* <div className='touristplacelist_cardBox'>
              {touristAttractions.map((places) => (
                  <div className='touristplacelist_card'>
                    <p>{places}</p>
                  </div>
              ))}
            </div> */}
            <div className='touristplace_cardBox'>
                {touristAttractions && touristAttractions.map((place, index) => (
                    <div key={index} className='touristplace_cards'>
                        <img src="https://plainbackground.com/plain1024/87c560.png" alt={place} />
                        <div className='touristplace_cards_textBox'>
                            <h2>{place}</h2>
                            <Button>View Details</Button>
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>
    </>
  )
}

export default TouristPlaceList