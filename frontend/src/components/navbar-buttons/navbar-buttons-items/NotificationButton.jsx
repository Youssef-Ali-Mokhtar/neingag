import NotificationButtonClasses from './notificationButton.module.css';
import { IoMdNotifications } from "react-icons/io";
import { forwardRef } from 'react';

const NotificationButton = ({ setNotifications }, ref) => {
    return ( <div 
        className={NotificationButtonClasses['notification-button']}
        onClick={setNotifications}
        ref={ref}
        >
        <IoMdNotifications className={NotificationButtonClasses['notification-icon']}/>
    </div> );
}
 
export default forwardRef(NotificationButton);