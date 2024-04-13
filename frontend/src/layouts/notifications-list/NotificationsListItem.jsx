import NotificationsClasses from './pc-notifications.module.css';
import { useNavigate } from 'react-router-dom';
import { extractAvatar, formatDate } from './../../util/utilFunctions';

const NotificationsListItem = ({ note }) => {
    const navigate = useNavigate();
    const notificationClick = (event) => {
        if (
          event.target.className ===
            NotificationsClasses['notification-img'] ||
            event.target.className ===
            NotificationsClasses['notification-username']
        ) {
          navigate(`/profile/${note?.userId._id}`);
        } else {
          navigate(`/${note?.postId}`);
        }
    }

    const comment = note.comment.substring(0, 60);
    return ( <div 
        className={NotificationsClasses['notifications-list-item']}
        onClick={notificationClick}
        >
            <img 
                className={NotificationsClasses['notification-img']}
                src={extractAvatar(note?.userId.avatarNum)} 
                alt="pic"/>
            <div className={NotificationsClasses['notification-text-container']}>
                <p
                    className={NotificationsClasses['notification-username']}>
                    {note?.userId.username}
                </p>
                <p>
                    {comment}{comment.length === 60? '... ':' ' }
                    <span> {formatDate(note.createdAt)}</span>
                </p>
            </div>
        
    </div> );
}
 
export default NotificationsListItem;