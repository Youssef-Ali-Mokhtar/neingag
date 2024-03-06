import NavbarButtonsClasses from './navbarButtons.module.css';
import SwitchTheme from './navbar-buttons-items/SwitchTheme';
import CreateButton from './navbar-buttons-items/CreateButton';
import ProfileButton from './navbar-buttons-items/ProfileButton';
import NotificationButton from './navbar-buttons-items/NotificationButton';

const NavbarButtons = () => {
    return ( <div className={NavbarButtonsClasses['navbar-buttons']}>
        <SwitchTheme/>
        <NotificationButton/>
        <ProfileButton/>
        <CreateButton/>
    </div> );
}
 
export default NavbarButtons;