import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '@/context/UserContext';
import { apiPath } from '@/utils/apiPath';

import './TouristPlaceFind.css'
import { Button } from '@/components/ui/button';

import './TouristPlaceDescription.css'
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar'
const TouristPlaceDescription = () => {
    const location = useLocation();
    const { place } = location.state;

    const navigate = useNavigate();
    const[pageLoading, setPageLoading] = useState(false);
    const[buttonLoading, setButtonLoading] = useState(false);

    const [weatherData, setWeatherData] = useState([]);
    const [aqiData, setAqiData] = useState([]);
    const [countryData, setCountryData] = useState([]);

    const leonobytesCountryName = localStorage.getItem('leonobytescountryname');
    const leonobytesStateName = localStorage.getItem('leonobytesstatename');

    const getWeatherData = async () => {
        try{
            const Apipath = `${apiPath}/weather`;
            const response = await axios.post(Apipath,{
                place_name: leonobytesStateName,
            });
            setPageLoading(false);
            if(response.data){
                setWeatherData(response.data);
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

    const getAqiData = async () => {
        try{
            const Apipath = `${apiPath}/city_aqi`;
            const response = await axios.post(Apipath,{
                city: leonobytesStateName,
            });
            
            setPageLoading(false);
            if(response.data){
                setWeatherData(response.data);
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

    const getCountryData = async () => {
        try{
            const Apipath = `${apiPath}/country_info`;
            const response = await axios.post(Apipath,{
                country_name: leonobytesCountryName,
            });
            
            setPageLoading(false);
            if(response.data){
                setCountryData(response.data);
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

    useEffect(() => {
        getWeatherData();
        getAqiData();
        getCountryData();
    }, []);


  return (
    <>
        <NavigationBar />
        <div className='touristplacedescription'>
            <div className='touristplacedescription_backimage'>
                <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg"/>
            </div>
            
            <div className='touristplacedescription_name'>
                <h2>{place}</h2>
            </div>
            
            {weatherData && aqiData &&
                <div className='touristplacedescription_middleBox'>
                    <div className='touristplacedescription_middleBox_items'>
                        <h2>Temp</h2>
                        <p>{weatherData.temp}°</p>
                    </div>
                    <div className='touristplacedescription_middleBox_items'>
                        <h2>Feels like</h2>
                        <p>{weatherData.feels_like}°</p>
                    </div>
                    <div className='touristplacedescription_middleBox_items'>
                        <h2>Humidity</h2>
                        <p>{weatherData.humidity}</p>
                    </div>
                    <div className='touristplacedescription_middleBox_items'>
                        <h2>Sky</h2>
                        <p>{weatherData.sky}</p>
                    </div>
                    <div className='touristplacedescription_middleBox_items'>
                        <h2>AQI Score</h2>
                        <p>{aqiData.aqi_value}</p>
                    </div>
                    <div className='touristplacedescription_middleBox_items'>
                        <h2>Air Quality</h2>
                        <p>{aqiData.air_quality}</p>
                    </div>
                </div>
            }

            {/* <div className='touristplacedescription_middleBox'>
                <div className='touristplacedescription_middleBox_items'>
                    <h2>Weather</h2>
                    <p>Sunny</p>
                </div>
                <div className='touristplacedescription_middleBox_items'>
                    <h2>AQI Score</h2>
                    <p>356</p>
                </div>
                <div className='touristplacedescription_middleBox_items'>
                    <h2>Local Currency</h2>
                    <p>Taka</p>
                </div>
                <div className='touristplacedescription_middleBox_items'>
                    <h2>Capital City</h2>
                    <p>Dhaka</p>
                </div>
            </div> */}

            <div className='touristplacedescription_description'>
                <h2>Cox Bazar</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eligendi nam dolorem iusto unde minus eveniet fugiat exercitationem odit, esse ex, magni velit assumenda earum recusandae numquam sequi quam! Ipsam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quos veniam eveniet quibusdam aspernatur esse, eos temporibus quia quasi dolores, magnam officiis dignissimos adipisci excepturi aperiam alias ipsam doloremque illo!</p>
                {countryData && 
                    <>
                        <h3>Currency: {countryData?.currencies}</h3>
                        <h3>Borders:</h3>
                            <ul>
                                {countryData?.currencies.map((currency, index) => (
                                    <li key={index}>
                                    {currency.name} - {currency.symbol}
                                    </li>
                                ))}
                            </ul>
                    </>
                }
            </div>

            <div className='touristplacedescription_album'>
                <h2>More Photos</h2>
                <div className='touristplacedescription_album_photos'>
                    <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg" />
                    <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg" />
                    <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg" />
                    <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg" />
                    <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg" />
                    <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg" />
                </div>
            </div>
        </div>
    </>
  )
}

export default TouristPlaceDescription