import React from 'react'
import './Heromain.css'
const Heromain = () => {
  return (
    <div className='homapage_heromain'>
        <div className='homapage_heromain_mainBox'>
            <div className='homapage_heromain_textBox'>
                <p>Explore waste management</p>
                <h1>Join us revolutionizing waste management practices and problems</h1>
                <h2>Partner with us to implement sustainable waste solutions</h2>
                <div className='homapage_heromain_textBox_inputBox'>
                  <button><a href="https://replymind.lemonsqueezy.com/affiliates" target="_blank">More</a></button>
                </div>
                
            </div>
            <div className='homapage_heromain_imageBox'>
                <img src='https://i.pinimg.com/originals/20/db/3d/20db3d7278ccdd243a9954b921f2eb9d.jpg' alt="homepage image" loading="lazy"/>
            </div>
        </div>

    </div>
  )
}

export default Heromain