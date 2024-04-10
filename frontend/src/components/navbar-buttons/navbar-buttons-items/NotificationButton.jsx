import NotificationButtonClasses from '../navbarButtons.module.css';
import { IoMdNotifications } from "react-icons/io";
import { forwardRef } from 'react';
import { useNoteContext } from './../../../hooks/useNoteContext';

const NotificationButton = ({ setNotifications }, ref) => {
    const { notifications } = useNoteContext();

    return ( <div 
        className={NotificationButtonClasses['notification-button']}
        onClick={setNotifications}
        ref={ref}
        >
        <IoMdNotifications className={NotificationButtonClasses['notification-icon']}/>
        {
            (notifications > 0) &&
            <div className={NotificationButtonClasses['notification-count']}>{notifications}</div>
        }
        
    </div> );
}

export default forwardRef(NotificationButton);