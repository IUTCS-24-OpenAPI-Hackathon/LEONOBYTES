import React from 'react'
import './TouristPlaceDescription.css'
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar'
const TouristPlaceDescription = () => {
  return (
    <>
        <NavigationBar />
        <div className='touristplacedescription'>
            <div className='touristplacedescription_backimage'>
                <img src="https://cdn.pixabay.com/photo/2018/03/20/14/00/sea-3243357_1280.jpg"/>
            </div>
            
            <div className='touristplacedescription_name'>
                <h2>Cox Bazar</h2>
            </div>
            
            <div className='touristplacedescription_middleBox'>
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
            </div>

            <div className='touristplacedescription_description'>
                <h2>Cox Bazar</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum eligendi nam dolorem iusto unde minus eveniet fugiat exercitationem odit, esse ex, magni velit assumenda earum recusandae numquam sequi quam! Ipsam! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quos veniam eveniet quibusdam aspernatur esse, eos temporibus quia quasi dolores, magnam officiis dignissimos adipisci excepturi aperiam alias ipsam doloremque illo!</p>
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