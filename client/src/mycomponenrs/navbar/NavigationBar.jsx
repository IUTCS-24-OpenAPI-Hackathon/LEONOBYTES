import React, {useState, useEffect} from 'react'
import './NavigationBar.css';
import {ImCross} from 'react-icons/im';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { checkLogin } from '@/utils/checkLogin';
import {useUserContext} from '../../context/UserContext';


const NavigationBar = () => {
  const notLoggedIn = checkLogin();
  const {userInfo, setUserInfo} = useUserContext();

  const [menuClickedCount,setMenuClickedCount]=useState(0);
  const toggleResponsiveNav = () => {
    let homepage_navigation_navMain = document.querySelector('.homepage_navigation_navMain');
    let navBarIconBurger = document.querySelector('.navBarIconBurger');
    let navBarIconCross = document.querySelector('.navBarIconCross');
    //alert(menuClickedCount);
    if(menuClickedCount&1){
      homepage_navigation_navMain.classList.remove('homepage_navigation_navMainOpen');
      navBarIconBurger.style.visibility = 'visible';
      navBarIconCross.style.visibility = 'hidden';
    }
    else{
      homepage_navigation_navMain.classList.add('homepage_navigation_navMainOpen');
      navBarIconCross.style.visibility = 'visible';
      navBarIconBurger.style.visibility = 'hidden';
    }
    setMenuClickedCount(menuClickedCount+1);
  }


  //screen size
  const [deviceType, setDeviceType] = useState('');

  //change navbar accorging to screen size
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setDeviceType('mobile');
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('pc');
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the resize handler initially to set the initial state
    handleResize();

    // Cleanup: remove event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array to ensure effect runs only once
  
  

  //slide to component
  useEffect(() => {
    const componentSlide = () => {
      var sectionId = window.location.hash.substring(1);
    
      // Check if the section ID exists and corresponds to an element on the page
      if (sectionId) {
        var targetSection = document.getElementById(sectionId);
    
        // Scroll to the target section smoothly
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'auto'
          });
        }
      }
    }

    setTimeout(() => {
      componentSlide();
    }, 150);
  }, []);
  
  
  //navbar fixation
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if(deviceType == 'pc'){
        if (window.scrollY > 100) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
      else{
        if (window.scrollY > 70) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="homepage_navigation">
        <div className={`homepage_navigation_mainBox ${isFixed? 'homepage_navigation_fixed': ''}`}>
          <div className="homepage_navigation_logoBar">
            <a href="/" className='my-auto'>
              <img src="/navbar/1.png" alt="navlogo" loading="lazy"/>
            </a>
            <div className='my-auto navBarIconBar'>
              <GiHamburgerMenu className='my-auto navBurgerIcon navBarIconBurger text-green-900' onClick={()=> toggleResponsiveNav()}/>
              <ImCross className=' my-auto navBurgerIcon navBarIconCross text-green-900' onClick={()=> toggleResponsiveNav()}/>
            </div>
          </div>

          <div className='homepage_navigation_navMain'>
            <div className='homepage_navigation_navMenu'>
              <div className="my-auto homepage_navigation_navSubMenu">
                <Link to="/" className='homepage_navigation_navMenuPageLinks'>Home</Link> 
                <Link to="/place/find" className='homepage_navigation_navMenuPageLinks'>places</Link> 
                {!notLoggedIn &&
                  (
                    <>
                      {/* <Link to="/chats" className='homepage_navigation_navMenuPageLinks'>Chats</Link> 
                      <Link to="/chatbot" className='homepage_navigation_navMenuPageLinks'>Chatbot</Link>  */}
                      <Link to="/chathover" className='homepage_navigation_navMenuPageLinks'>Chatbot</Link>
                    </>
                  )
                }
                <a href="/#features" className='homepage_navigation_navMenuPageLinks'>Features</a>
                <a href="/#contacts" className='homepage_navigation_navMenuPageLinks'>Contacts</a> 
                {
                  notLoggedIn ? 
                  (
                    <Link to="/auth/login" className="my-auto homepage_navigation_loginButton">
                      <button className='mx-auto'>Log In</button>
                    </Link>
                  )
                  :
                  (
                    <Link to="/profile" className="my-auto homepage_navigation_loginButton">
                      <button className='mx-auto'>{userInfo}</button>
                    </Link>
                  )
                }
              </div>
            </div> 
          </div>
        </div>
    </div>
  )
}

export default NavigationBar