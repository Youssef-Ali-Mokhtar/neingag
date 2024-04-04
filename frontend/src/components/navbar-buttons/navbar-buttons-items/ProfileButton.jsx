import ProfileButtonClasses from './../navbarButtons.module.css';
import { forwardRef } from 'react';
import {useAuthContext}from './../../../hooks/useAuthContext';
import {extractAvatar} from './../../../util/utilFunctions';
const ProfileButton = ({ setProfile }, ref) => {
    const { user } = useAuthContext();
    return ( <div 
        className={ProfileButtonClasses['profile-button']} 
        onClick={setProfile}
        ref={ref}
        >
        <img src={extractAvatar(user?.avatarNum)} alt="pic"/>
        <div className={ProfileButtonClasses['overlay']}></div>
    </div> );
}
 
export default forwardRef(ProfileButton);