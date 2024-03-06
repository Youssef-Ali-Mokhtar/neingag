import ProfileButtonClasses from './profileButton.module.css';
import prof from '../../../assets/prof.png';

const ProfileButton = () => {
    return ( <div className={ProfileButtonClasses['profile-button']}>
        <img src={prof} alt="pic"/>
        <div className={ProfileButtonClasses['overlay']}></div>
    </div> );
}
 
export default ProfileButton;