import NotificationButtonClasses from '../navbarButtons.module.css';
import { IoMdNotifications } from "react-icons/io";
import { useNoteContext } from './../../../hooks/useNoteContext';
import { useNavigate } from 'react-router-dom';

const MobileNotificationButton = () => {
    const { notifications } = useNoteContext();
    const navigate = useNavigate();

    const navigateNotifications = ()=>{
        navigate('/notifications');
    }

    return ( <div 
        className={NotificationButtonClasses['notification-button']}
        onClick={navigateNotifications}
        >
        <IoMdNotifications className={NotificationButtonClasses['notification-icon']}/>
        {
            (notifications > 0) &&
            <div className={NotificationButtonClasses['notification-count']}>{notifications}</div>
        }
        
    </div> );
}

export default MobileNotificationButton;