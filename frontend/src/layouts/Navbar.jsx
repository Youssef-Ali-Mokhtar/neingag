import NavbarClasses from './navbar.module.css';
import SearchBar from '../components/search-bar/SearchBar';
import NavbarButtons from '../components/navbar-buttons/NavbarButtons';
import NavbarLogo from '../components/navbar-logo/NavbarLogo';
import PCNotifications from './notifications-list/pc/PCNotifications';
import PCProfile from './profile-list/PCProfile';
import Modal from '../components/modal/Modal';
import { useState, useRef, useEffect } from 'react';
import Login from '../components/login/Login';

const Navbar = () => {
    const [notifications, setNotifications] = useState(false);
    const [profile, setProfile] = useState(false);
    const [loginModal, setLoginModal] = useState(false);


    const notificationRef = useRef();
    const notificationBtnRef = useRef();

    const profileRef = useRef();
    const profileBtnRef = useRef();

    const handleLoginModal = (e)=> {
      setLoginModal(prev=>!prev);
    }


    const handleNotifications = ()=> {

        setNotifications(prev=>!prev);
    }

    const handleProfile = ()=> {
        setProfile(prev=>!prev);
    }


    //To handle opening and closing notifications and profile dropdowns
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
        <SearchBar/>
        <NavbarButtons
            setNotifications={handleNotifications}
            setProfile={handleProfile}
            ref={{notificationBtnRef, profileBtnRef}}
        />
        {notifications && <PCNotifications ref={notificationRef}/>}
        {profile && <PCProfile ref={profileRef}/>}
        {loginModal && 
          <Modal handleModal={handleLoginModal}>
            <Login/>
          </Modal>
          }
        <button onClick={handleLoginModal}>login</button>
    </div> );
}
 
export default Navbar;