import ProfileClasses from './profile.module.css';
import ProfileHeader from './ProfileHeader';
import { Outlet } from 'react-router-dom';

const Profile = () => {
    return ( <div className={ProfileClasses['profile']}>
        <ProfileHeader/>
        <Outlet/>
    </div> );
}

export default Profile;