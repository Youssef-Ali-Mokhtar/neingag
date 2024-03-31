import ProfileClasses from './profile.module.css';
import profilePicture from '../../assets/prof.png';
import ProfileNavbar from './ProfileNavbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfileHeader = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState({username:''});

    useEffect(()=> {
        const fetchProfile = ()=> {
            fetch(`http://localhost:4000/api/users/profile/${userId}`)
            .then((response)=>{
                return response.json();
            })
            .then(data=>{
                setProfileData(data);
            })
            .catch(err=>{
                console.log(err.message);
            })
        }
        fetchProfile();
    },[userId])

    return ( <div className={ProfileClasses['profile-header-container']}>
        <div className={ProfileClasses['profile-header']}>

            <div className={ProfileClasses['image-holder']}>
                <img src={profilePicture} alt="pic"/>
            </div>

            <div className={ProfileClasses['text-holder']}>
                    <h2>{ profileData.username }</h2>
                    <p>4,500 days</p>
            </div>
            
        </div>
        <div className={ProfileClasses['bio-holder']}>My cringe collection!</div>
        <ProfileNavbar/>
    </div> );
}

export default ProfileHeader;