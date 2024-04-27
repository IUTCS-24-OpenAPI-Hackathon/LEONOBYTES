import React from 'react'
import './Heromain.css'
const Heromain = () => {
  return (
    <div className='homapage_heromain'>
        <div className='homapage_heromain_mainBox'>
            <div className='homapage_heromain_textBox'>
                <p>Explore Places</p>
                <h1>Join us in finding the best tourist spots in the world for you!</h1>
                <h2>Partner with us to be happy</h2>
                <div className='homapage_heromain_textBox_inputBox'>
                  <button><a href="https://replymind.lemonsqueezy.com/affiliates" target="_blank">More</a></button>
                </div>
                
            </div>
            <div className='homapage_heromain_imageBox'>
                <img src='https://cdn1.vectorstock.com/i/1000x1000/80/30/tour-planning-design-concept-vector-14718030.jpg' alt="homepage image" loading="lazy"/>
            </div>
        </div>

    </div>
  )
}

export default Heromain