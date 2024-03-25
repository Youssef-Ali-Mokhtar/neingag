import ProfileClasses from './profile.module.css';
import { NavLink } from 'react-router-dom';

const navClass = ({isActive})=> {
    return `${ProfileClasses['profile-navbar-items']} ${isActive?ProfileClasses['focus']:''}`
}

const ProfileNavbar = () => {
    return ( <div className={ProfileClasses['profile-navbar']}>
        <NavLink to='posts' className={navClass}>
            Posts
        </NavLink>
        <NavLink to='bookmarks' className={navClass}>
            Bookmarks
        </NavLink>
        
    </div> );
}
 
export default ProfileNavbar;