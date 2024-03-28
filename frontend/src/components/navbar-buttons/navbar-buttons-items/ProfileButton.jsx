import ProfileButtonClasses from './../navbarButtons.module.css';
import prof from './../../../assets/prof.png';
import { forwardRef } from 'react';

const ProfileButton = ({ setProfile }, ref) => {
    return ( <div 
        className={ProfileButtonClasses['profile-button']} 
        onClick={setProfile}
        ref={ref}
        >
        <img src={prof} alt="pic"/>
        <div className={ProfileButtonClasses['overlay']}></div>
    </div> );
}
 
export default forwardRef(ProfileButton);