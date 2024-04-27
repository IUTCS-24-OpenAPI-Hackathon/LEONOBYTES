import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '@/context/UserContext';
import { apiPath } from '@/utils/apiPath';

import { Button } from '@/components/ui/button';

import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css"
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import PageLoading from '@/mycomponenrs/loading/PageLoading';

const MapPlace = () => {
    const location = useLocation();
    const { amenity } = location.state;

    const mapContainerRef = useRef(null);
    const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const[pageLoading, setPageLoading] = useState(false);
    const[buttonLoading, setButtonLoading] = useState(false);

    const [markers, setMarkers] = useState([]);
    const [allData, setAllData] = useState([]);

    const leonobytesStateName = localStorage.getItem('leonobytesstatename');

    useEffect(() => {
        if (allData && allData.user_location_lng && allData.user_location_lat) {
            mapboxgl.accessToken = mapboxAccessToken;
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [allData.user_location_lng, allData.user_location_lat], // Center coordinates
                zoom: 9, // Initial zoom level
            });

                    // Add the center marker with blue color
            new mapboxgl.Marker({
                color: 'blue', // Set marker color to blue for center
                scale: 1, // Increase marker size (default is 1)
            })
            .setLngLat([allData.user_location_lng, allData.user_location_lat])
            .setPopup(new mapboxgl.Popup().setText(allData.user_location_name))
            .addTo(map);


            markers.forEach((marker, index) => {
                const markerColor = 'red';
                const newMarker = new mapboxgl.Marker({
                    color: markerColor, // Set marker color to red
                    scale: 1, // Increase marker size (default is 1)
                })
                .setLngLat([marker.longitude, marker.latitude]) // Use the marker array directly
                .setPopup(new mapboxgl.Popup().setText(marker.name))
                .addTo(map);

                // Attach click event listener to the marker
                // newMarker.getElement().addEventListener('click', () => {
                //     window.open(`https://www.google.com/maps/?q=${marker.latitude},${marker.longitude}`, '_blank');
                // });
                newMarker.getPopup().on('open', () => {
                    document.querySelector('.mapboxgl-popup-content').addEventListener('click', () => {
                        window.open(`https://www.google.com/maps/?q=${marker.latitude},${marker.longitude}`, '_blank');
                    });
                });
            });

            // Cleanup
            return () => map.remove();
        }
    }, [markers, mapboxAccessToken]);
    
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
    }, [])


    if(pageLoading){
        return(
            <div>
                <PageLoading />
            </div>
        )
    }
    return (
        <>
            <NavigationBar />
            <div className='h-[5.5vw]'>
            </div>
            <h1 className='text-center text-4xl m-[2vw]'>Nearby {amenity[0]}</h1>
            <div
                ref={mapContainerRef}
                style={{ height: '40vw', width: '90%', margin: 'auto'}}
            />
        </>
    );
}

export default MapPlace