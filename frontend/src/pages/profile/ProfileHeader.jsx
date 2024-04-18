import ProfileClasses from './profile.module.css';
import ProfileNavbar from './ProfileNavbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, extractAvatar } from '../../util/utilFunctions';

const ProfileHeader = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState(null);

    useEffect(()=> {
        const fetchProfile = ()=> {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/profile/${userId}`)
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
        {   profileData &&
                <>
                    <div className={ProfileClasses['profile-header']}>
                        
                        <div className={ProfileClasses['image-holder']}>
                            <img src={extractAvatar(profileData.avatarNum)} alt="pic"/>
                        </div>
                        
                        <div className={ProfileClasses['text-holder']}>
                                <h2>{ profileData.username }</h2>
                                <p>{formatDate(profileData.createdAt)}</p>
                        </div>
                    </div>
                    <div className={ProfileClasses['bio-holder']}>{profileData.bio}</div>
                    <ProfileNavbar/>
                </>
        }
    </div> );
}

export default ProfileHeader;