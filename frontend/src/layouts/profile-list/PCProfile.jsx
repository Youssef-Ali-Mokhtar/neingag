import PCProfileClasses from './pc-profile.module.css';
import { forwardRef } from 'react';
import ProfileListItem from './ProfileListItem';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const PCProfile = (props, ref) => {
    const navigate = useNavigate();
    const {handleLogout: logout} = useAuthContext();

    const handleNavigate = (event)=>{
        event.preventDefault();
        navigate('profile');
    }
    const handleLogout = ()=>{
        logout();
        navigate('/');
    }

    const handleBookmarks = ()=>{
        navigate('profile/bookmarks');
    }

    return ( <div className={PCProfileClasses['profile']} ref={ref}>
        <ProfileListItem title='My Profile' onClick={handleNavigate}/>
        <ProfileListItem title='Logout' onClick={handleLogout}/>
        <ProfileListItem title='Bookmarks' onClick={handleBookmarks}/>
    </div> );
}
 
export default forwardRef(PCProfile);