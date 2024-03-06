import NotificationButtonClasses from './notificationButton.module.css';
import { IoMdNotifications } from "react-icons/io";

const NotificationButton = () => {
    return ( <div className={NotificationButtonClasses['notification-button']}>
        <IoMdNotifications className={NotificationButtonClasses['notification-icon']}/>
    </div> );
}
 
export default NotificationButton;