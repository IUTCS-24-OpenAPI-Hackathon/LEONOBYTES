import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './TouristPlace.css'
import axios from 'axios';

import {useUserContext} from '../../context/UserContext';
import { apiPath } from '@/utils/apiPath';
import PageLoading from '@/mycomponenrs/loading/PageLoading';
import { Button } from '@/components/ui/button';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';

const TouristPlace = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();
    const [pageLoading, setPageLoading] = useState(true);

    const[places, setPlaces] = useState([]);

    const [displayedPlaces, setDisplayedPlaces] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [hasMorePlaces, setHasMorePlaces] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryPlaces, setSelectedCategoryPlaces] = useState([]);

    const getTouristPlaces = async() => {
        setPageLoading(true);
        try{
            const apipath = `${apiPath}/users`;
            const response = await axios.get(apipath);
            setPageLoading(false);
            
            // console.log(response.data);
            if(response.data.message == "found places"){
                setPlaces(response.data.places);
                setSelectedCategoryPlaces(response.data.places);
                setDisplayedPlaces(response.data.places.slice(0, 4));
            }
            else{
                console.log(response.data.message);
            }
        }
        catch(error){
            setPageLoading(false);
            console.log(error.message);
        }
    }
    const kisu = () => {
        const response = {
            "places": [
              {
                "name": "Cox bazar",
                "rating": 4.5,
                "location": "sfsf sfsfs fs",
                "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate praesentium quam error ad repellendus, sunt culpa. Minima, nemo neque, dolorem repellendus ipsum eligendi aspernatur eum ex iusto, excepturi esse quisquam!",
                "category": "Category1",
                "image": "https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg"
              },
              {
                "name": "Beach Resort",
                "rating": 4.2,
                "location": "Beachside Road, ABC City",
                "description": "Enjoy a luxurious stay at our beach resort with stunning ocean views and world-class amenities.",
                "category": "Category2",
                "image": "https://example.com/beach-resort.jpg"
              },
              {
                "name": "Mountain Retreat",
                "rating": 4.8,
                "location": "Mountain Valley, XYZ Town",
                "description": "Escape to the tranquil mountain retreat and immerse yourself in the beauty of nature.",
                "category": "Category3",
                "image": "https://example.com/mountain-retreat.jpg"
              },
              {
                "name": "City Explorer",
                "rating": 4.0,
                "location": "Downtown Area, PQR City",
                "description": "Discover the vibrant culture and bustling streets of the city with our guided tours.",
                "category": "Category1",
                "image": "https://example.com/city-explorer.jpg"
              },
              {
                "name": "Machu Picchu",
                "rating": 4.8,
                "location": "Cusco Region, Peru",
                "description": "Explore the ancient Inca city situated high in the Andes Mountains and marvel at its breathtaking architecture.",
                "category": "Historical",
                "image": "https://cdn.pixabay.com/photo/2016/01/19/17/53/machu-picchu-1149748_1280.jpg"
              },
              {
                "name": "Santorini",
                "rating": 4.7,
                "location": "Cyclades, Greece",
                "description": "Experience the stunning white-washed buildings and picturesque sunsets on the Greek island of Santorini.",
                "category": "Island",
                "image": "https://cdn.pixabay.com/photo/2017/07/17/22/47/santorini-2511087_1280.jpg"
              },
              {
                "name": "Grand Canyon",
                "rating": 4.9,
                "location": "Arizona, United States",
                "description": "Witness the awe-inspiring beauty of one of the world's most famous natural wonders, the Grand Canyon.",
                "category": "Natural",
                "image": "https://cdn.pixabay.com/photo/2016/01/19/17/48/grand-canyon-1149883_1280.jpg"
              },
              {
                "name": "Tokyo",
                "rating": 4.6,
                "location": "Tokyo, Japan",
                "description": "Experience the vibrant culture, delicious cuisine, and modern marvels of Japan's bustling capital city, Tokyo.",
                "category": "City",
                "image": "https://cdn.pixabay.com/photo/2018/01/23/11/04/tokyo-3104350_1280.jpg"
              }
            ]
        }
        setPlaces(response.places);
        setSelectedCategoryPlaces(response.places);
        setDisplayedPlaces(response.places.slice(0, 4));
          
    }

    useEffect(() => {
        // getTouristPlaces();
        kisu()
    }, []);


    // Function to display the next four places
    const showMorePlaces = () => {
        const newIndex = startIndex + 4;
        const newDisplayedPlaces = displayedPlaces.concat(selectedCategoryPlaces.slice(newIndex, newIndex + 4));
        setDisplayedPlaces(newDisplayedPlaces);
        setStartIndex(newIndex);
        // if(newIndex+4 > places.size())setHasMorePlaces(false);
    };


    //filter by categories
    const filterPlacesByCategory = (category) => {
        if (category === 'All') {
            setSelectedCategoryPlaces(places);
            setDisplayedPlaces(places.slice(0, 4));
        } else {
            const filteredPlaces = places.filter(place => place.category === category);
            setSelectedCategoryPlaces(filteredPlaces);
            setDisplayedPlaces(filteredPlaces.slice(0, 4));
        }
        setStartIndex(0);
        setHasMorePlaces(true);
        setSelectedCategory(category);
    };


    const categories = ['All', 'Category1', 'Category2', 'Category3'];

  return (
    <>
    <NavigationBar />
    <div className='touristplace'>
        <div className='touristplace_mainBox'>
            <div className='touristplace_headerBox'>
                <h1>Suggested Places</h1>
                <select value={selectedCategory} onChange={(e) => filterPlacesByCategory(e.target.value)}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className='touristplace_cardBox'>
                <div className='touristplace_cards'>
                    <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg" />
                    <div className='touristplace_cards_textBox'>
                        <h2>Cox bazar</h2>
                        <h3>Rating: 4.5</h3>
                        <h3>locations: sfsf sfsfs fs</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate praesentium quam error ad repellendus, sunt culpa. Minima, nemo neque, dolorem repellendus ipsum eligendi aspernatur eum ex iusto, excepturi esse quisquam!</p>
                        <Button>View Details</Button>
                    </div>
                </div>
                {displayedPlaces && displayedPlaces.map((place, index) => (
                    <div key={index} className='touristplace_cards'>
                        <img src={place.image} alt={place.name} />
                        <div className='touristplace_cards_textBox'>
                            <h2>{place.name}</h2>
                            <h3>Rating: {place.rating}</h3>
                            <h3>Location: {place.location}</h3>
                            <p>{place.description}</p>
                            <Button>View Details</Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='touristplace_more_button'>
                <Button onClick={()=>showMorePlaces()}>More Places</Button>
            </div>     
        </div>
    </div>
    </>
  )
}

export default TouristPlace