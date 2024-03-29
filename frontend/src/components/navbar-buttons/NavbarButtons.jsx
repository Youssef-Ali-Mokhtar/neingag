import NavbarButtonsClasses from './navbarButtons.module.css';
import SwitchTheme from './navbar-buttons-items/SwitchTheme';
import CreateButton from './navbar-buttons-items/CreateButton';
import ProfileButton from './navbar-buttons-items/ProfileButton';
import NotificationButton from './navbar-buttons-items/NotificationButton';
import AuthButton from './navbar-buttons-items/AuthButton';
import { forwardRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const NavbarButtons = ({ setNotifications, setProfile }, ref) => {
    const { user } = useAuthContext();
    return ( <div className={NavbarButtonsClasses['navbar-buttons']}>
        
        <SwitchTheme/>
        
        {
            user &&
            <>
                <NotificationButton setNotifications={setNotifications} ref={ref.notificationBtnRef}/>
                <ProfileButton setProfile={setProfile} ref={ref.profileBtnRef}/>
                <CreateButton/>
            </>
        }
        

        {
            !user && <AuthButton/>
        }
    </div> );
}

export default forwardRef(NavbarButtons);