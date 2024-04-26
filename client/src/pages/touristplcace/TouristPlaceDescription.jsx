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
    const [placeData, setPlaceData] = useState([]);
    const [countryData, setCountryData] = useState([]);


    const leonobytesCountryName = localStorage.getItem('leonobytescountryname');
    const leonobytesStateName = localStorage.getItem('leonobytesstatename');

    const getWeatherData = async () => {
        try{
            const Apipath = `${apiPath}/weather/`;
            const response = await axios.post(Apipath,{
                place_name: leonobytesCountryName,
            });
            //console.log(response.data);
            setPageLoading(false);
            if(response.status == 200){
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
        //console.log(leonobytesStateName)
        try{
            const Apipath = `${apiPath}/city_aqi/`;
            const response = await axios.post(Apipath,{
                city: leonobytesCountryName,
            });
            // console.log(response.data);
            setPageLoading(false);
            if(response.status == 200){
                setAqiData(response.data);
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

    const getPlaceData = async () => {
        try{
            const Apipath = `${apiPath}/place_description`;
            const response = await axios.post(Apipath,{
                place_name: leonobytesStateName,
            });
            //console.log(response.data);
            setPageLoading(false);
            if(response.status == 200){
                console.log(response.data)
                setPlaceData(response.data.description);
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
            console.log(response.data);
            setPageLoading(false);
            if(response.status == 200){
                console.log(response.data)
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
        getPlaceData();
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
                
            <div className='touristplacedescription_description'>
                <h2>{leonobytesStateName}</h2>
                {placeData && 
                    <p>{placeData}</p>
                }
                       
                {countryData &&
                <>
                    <h3><b>Currency</b>: {countryData.currencies}</h3>
                        {countryData.borders && countryData.borders.length > 0 && <h3><b>Borders:</b> {countryData.borders[0]}</h3>}
                        {countryData.capitals && countryData.capitals.length > 0 && <h3><b>Capitals:</b> {countryData.capitals[0]}</h3>}
                    </>
                }       
            </div>
            

            <div className='touristplacedescription_album'>
                <h2>More Photos: </h2>
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