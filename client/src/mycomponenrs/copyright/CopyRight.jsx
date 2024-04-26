import React from 'react'
import './CopyRight.css'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
const CopyRight = () => {
  return (
    <div className='copyright'>
        <div className='copyright_mainBox'>
            <div className='copyright_textBox'>
                <p> &copy; 2024 Tafsir Rahman Copyright and rights reserved</p>
            </div>
            <div className='copyright_iconBox'>
                <FaFacebookF className='copyright_icons'/>
                <FaTwitter className='copyright_icons'/>
                <FaLinkedinIn className='copyright_icons'/>
                <FaInstagram className='copyright_icons'/>
            </div>
        </div>
    </div>
  )
}

export default CopyRight