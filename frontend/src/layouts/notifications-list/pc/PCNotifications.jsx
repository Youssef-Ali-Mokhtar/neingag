import PCNotificationsClasses from './pc-notifications.module.css';
import { forwardRef } from 'react';

const PCNotifications = (props, ref) => {
    
    return ( <div className={PCNotificationsClasses['notifications']} ref={ref}>
        Notifications
    </div> );
}
 
export default forwardRef(PCNotifications);