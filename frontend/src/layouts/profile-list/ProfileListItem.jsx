import ProfileClasses from './pc-profile.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileListItem = ({title, link}) => {
    const navigate = useNavigate();
    const handleNavigate = (event)=>{
        event.preventDefault();
        navigate(link);
    }
    return ( <div 
        to={link} 
        className={ProfileClasses['profile-list-item']}
        onClick={handleNavigate}
        >
        {title}
    </div> );
}
 
export default ProfileListItem;