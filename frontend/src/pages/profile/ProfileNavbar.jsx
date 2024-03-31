import { useAuthContext } from '../../hooks/useAuthContext';
import ProfileClasses from './profile.module.css';
import { NavLink, useParams } from 'react-router-dom';

const navClass = ({isActive})=> {
    return `${ProfileClasses['profile-navbar-items']} ${isActive?ProfileClasses['focus']:''}`
}

const ProfileNavbar = () => {
    const { user } = useAuthContext();
    const { userId } = useParams();
    console.log(user?.userId);
    console.log(userId);
    const isLoggedUser = user?.userId === userId;

    return ( <div className={ProfileClasses['profile-navbar']}>
        <NavLink to='posts' className={navClass}>
            Posts
        </NavLink>

        {
            isLoggedUser &&
                <NavLink to='bookmarks' className={navClass}>
                    Bookmarks
                </NavLink>
        }

    </div> );
}
 
export default ProfileNavbar;