import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '@/context/UserContext';
import { apiPath } from '@/utils/apiPath';

import './TouristPlaceFind.css'
import { Button } from '@/components/ui/button';

const TouristPlaceFind = () => {
  const navigate = useNavigate();
  const[pageLoading, setPageLoading] = useState(false);
  const[buttonLoading, setButtonLoading] = useState(false);

  const[allCountry, setAllCountry] = useState([]);
  const[selectedCountry, setSelectedCountry] = useState('');

  const[allState, setAllState] = useState([]);
  const[selectedState, setSelectedState] = useState('');

  const[allSuggestion, setAllSuggestion] = useState([]);

  const [pageNo, setPageNo] = useState(0);
  
  const getAllCountry = async () => {
    setPageLoading(true);
    try{
        const Apipath = `${apiPath}/countries`;
        const response = await axios.get(Apipath);
        //console.log(response.data.countries);
        setPageLoading(false);
        if(response.status){
          setAllCountry(response.data.countries);
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
    getAllCountry();
  }, []);

  const getAllState = async () => {
    setButtonLoading(true);
    try{
        const Apipath = `${apiPath}/states`;
        const response = await axios.post(Apipath,{
            country_name: selectedCountry
        });
        //console.log(response.data.states);
        setButtonLoading(false);
        if(response.status == 200){
          setAllState(response.data.states);
          setPageNo((pageNo + 1) % 2);
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

  const getAllSuggestions = async () => {
    setButtonLoading(true);
    try{
        const Apipath = `${apiPath}/tourist_attractions`;
        const response = await axios.post(Apipath,{
            place_name: selectedState + ", " + selectedCountry,
        });
        //console.log(response.data.tourist_attractions);
        setButtonLoading(false);
        if(response.data.tourist_attractions){
          const touristAttractions = response.data.tourist_attractions;
          localStorage.setItem('leonobytescountryname', selectedCountry);
          localStorage.setItem('leonobytesstatename', selectedState);
          navigate('/place/list', { state: { touristAttractions } });
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

  const handleCountry = () => {
    return (
        <>
            <h2>Select country</h2>
            <select id="selector" value={selectedCountry} onChange={(event) => {setSelectedCountry(event.target.value);}} >
                <option value="">Select Country</option>    
                {allCountry && allCountry.map((country) => (
                    <option value={country} key={country}>{country}</option>
                ))}
             </select>
        </>
     )
  }

  const handleState = () => {
    return (
        <>
            <h2>Select state</h2>
            <select id="selector" value={selectedState} onChange={(event) => {setSelectedState(event.target.value);}} >
                <option value="">Select state</option>    
                {allState && allState.map((state) => (
                    <option value={state} key={state}>{state}</option>
                ))}
             </select>
        </>
     )
  }


  const handlePageNext = () => {
    if(pageNo == 0){
      getAllState();
    }
    else if(pageNo == 1){
      getAllSuggestions()
    }
    else setPageNo((pageNo + 1) % 2);
  };

  const handlePagePrev = () => {
    if(pageNo > 0)setPageNo((pageNo - 1) % 2);
  };

  const renderContent = () => {
    switch (pageNo) {
      case 0:
        return handleCountry();
      case 1:
        return handleState();
      default:
        return null;
    }
  };

  return (
    <div className='login'>
        <div className='login_mainBox'>
            {renderContent()}
            <div className='createproduct_buttons'>
              <Button variant="outline" onClick={()=>handlePagePrev()}>Prev</Button>
              <Button variant="outline" onClick={()=>handlePageNext()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Next'
                }
              </Button>
            </div>
        </div>
    </div>
  )
}

export default TouristPlaceFind