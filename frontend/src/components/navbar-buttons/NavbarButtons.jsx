import NavbarButtonsClasses from './navbarButtons.module.css';
import SwitchTheme from './navbar-buttons-items/SwitchTheme';
import CreateButton from './navbar-buttons-items/CreateButton';
import ProfileButton from './navbar-buttons-items/ProfileButton';
import NotificationButton from './navbar-buttons-items/NotificationButton';
import { forwardRef } from 'react';

const NavbarButtons = ({ setNotifications, setProfile }, ref) => {
    return ( <div className={NavbarButtonsClasses['navbar-buttons']}>
        <SwitchTheme/>
        <NotificationButton setNotifications={setNotifications} ref={ref.notificationBtnRef}/>
        <ProfileButton setProfile={setProfile} ref={ref.profileBtnRef}/>
        <CreateButton/>
    </div> );
}

export default forwardRef(NavbarButtons);