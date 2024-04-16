import NavbarButtonsClasses from './navbarButtons.module.css';
import SwitchTheme from './navbar-buttons-items/SwitchTheme';
import CreateButton from './navbar-buttons-items/CreateButton';
import ProfileButton from './navbar-buttons-items/ProfileButton';
import NotificationButton from './navbar-buttons-items/NotificationButton';
import AuthButton from './navbar-buttons-items/AuthButton';
import { forwardRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import MobileNotificationButton from './navbar-buttons-items/MobileNotificationButton';

const NavbarButtons = ({ setNotifications, setProfile, windowWidth }, ref) => {
    const { user } = useAuthContext();
    return ( <div className={NavbarButtonsClasses['navbar-buttons']}>
        <SwitchTheme/>
        {  user &&
           <>   
                {
                    windowWidth > 600?
                        <NotificationButton 
                            setNotifications={setNotifications} 
                            ref={ref.notificationBtnRef}/>:
                        <MobileNotificationButton/>
                }
                
                <ProfileButton setProfile={setProfile} ref={ref.profileBtnRef}/>
                <CreateButton/>
            </>
        }

        { !user && <AuthButton/> }
    </div> );
}

export default forwardRef(NavbarButtons);