import NavbarClasses from './navbar.module.css';
import SearchBar from '../components/search-bar/SearchBar';
import NavbarButtons from '../components/navbar-buttons/NavbarButtons';
import NavbarLogo from '../components/navbar-logo/NavbarLogo';
import PCNotifications from './notifications-list/PCNotifications';
import PCProfile from './profile-list/PCProfile';
import FloatingCreateButton from '../components/create-button/FloatingCreateButton';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Authentication from '../components/login/Authentication';
import { useAuthModalContext } from './../hooks/useAuthModalContext';

const Navbar = () => {
    const [notifications, setNotifications] = useState(false);
    const [profile, setProfile] = useState(false);
    const location = useLocation();
    const isCreatePostPath = location.pathname === '/create-post';
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { authModal } = useAuthModalContext();

    const notificationRef = useRef();
    const notificationBtnRef = useRef();

    const profileRef = useRef();
    const profileBtnRef = useRef();

    const handleNotifications = ()=> {
        setNotifications(prev=>!prev);
    }

    const handleProfile = ()=> {
        setProfile(prev=>!prev);
    }

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(()=>{
        
        const closeNotificationMenu = (event) => {
            if (
                notificationRef.current &&
                // !notificationRef.current.contains(event.target) &&
                !notificationBtnRef.current.contains(event.target)
              ) {
                setNotifications(false);
              }
        };
        const closeProfileMenu = (event) => {
            if (
                profileRef.current &&
                // !profileRef.current.contains(event.target) &&
                !profileBtnRef.current.contains(event.target)
              ) {
                setProfile(false);
              }
        };

        document.addEventListener('click', closeNotificationMenu);
        document.addEventListener('click', closeProfileMenu);

        return () => {
          document.removeEventListener('click', closeNotificationMenu);
          document.removeEventListener('click', closeProfileMenu);
        };
    }, []);

    return ( <div className={NavbarClasses['navbar']}>
        <NavbarLogo/>
        <SearchBar device='pc' windowWidth={windowWidth}/>
        <NavbarButtons
            windowWidth={windowWidth}
            setNotifications={handleNotifications}
            setProfile={handleProfile}
            ref={{notificationBtnRef, profileBtnRef}}
        />
        {notifications && <PCNotifications ref={notificationRef}/>}
        {profile && <PCProfile ref={profileRef}/>}
        {authModal && <Authentication/>}
        {!isCreatePostPath && <FloatingCreateButton/>}
    </div> );
}

export default Navbar;