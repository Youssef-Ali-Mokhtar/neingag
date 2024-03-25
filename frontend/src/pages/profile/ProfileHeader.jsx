import ProfileClasses from './profile.module.css';
import profilePicture from '../../assets/prof.png';
import ProfileNavbar from './ProfileNavbar';

const ProfileHeader = () => {
    return ( <div className={ProfileClasses['profile-header-container']}>
        <div className={ProfileClasses['profile-header']}>

            <div className={ProfileClasses['image-holder']}>
                <img src={profilePicture} alt="pic"/>
            </div>

            <div className={ProfileClasses['text-holder']}>
                    <h2>Username</h2>
                    <p>4,500 days</p>
            </div>
            
        </div>
        <div className={ProfileClasses['bio-holder']}>My cringe collection!</div>
        <ProfileNavbar/>
    </div> );
}

export default ProfileHeader;