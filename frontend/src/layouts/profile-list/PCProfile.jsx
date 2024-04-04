import PCProfileClasses from './pc-profile.module.css';
import { forwardRef } from 'react';
import ProfileListItem from './ProfileListItem';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const PCProfile = (props, ref) => {
    const navigate = useNavigate();
    const {
        handleLogout: logout,
        user
    } = useAuthContext();

    const handleNavigate = (event)=>{
        event.preventDefault();
        navigate(`profile/${user.userId}`);
    }
    const handleLogout = (event)=>{
        event.preventDefault();

        //to postpone the disappearance of profile dropdown, 
        //otherwise it's ref will point to null while using or clicking on logout
        setTimeout(()=>{
            logout();
        }, 0)
        
        navigate('/');
    }

    const handleBookmarks = (event)=>{
        event.preventDefault();
        navigate(`/profile/${user.userId}/bookmarks`);
    }

    const handleSettings = (event)=>{
        event.preventDefault();
        navigate(`/settings`);
    }

    return ( <div className={PCProfileClasses['profile']} ref={ref}>
        <ProfileListItem title='My Profile' onClick={handleNavigate}/>
        <ProfileListItem title='Logout' onClick={handleLogout}/>
        <ProfileListItem title='Bookmarks' onClick={handleBookmarks}/>
        <ProfileListItem title='Settings' onClick={handleSettings}/>
    </div> );
}
 
export default forwardRef(PCProfile);