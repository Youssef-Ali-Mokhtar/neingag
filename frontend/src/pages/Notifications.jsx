import notificationsClasses from './notifications.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNoteContext } from '../hooks/useNoteContext';
import NotificationsListItem from '../layouts/notifications-list/NotificationsListItem';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();
    const {
        notifications: notificationsNum,
        resetNotifications
     } = useNoteContext();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        
        const fetchNotifications = () => {
            fetch(`http://localhost:4000/api/users/notifications?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if(!data.length) {
                        setHasMore(false);
                    }else {
                        if(page === 1){
                            setNotifications(data);
                        } else {
                            setNotifications(prev=>[...prev, ...data]);
                        }
                    }
    
                })
                .catch(err => {
                    console.log(err);
                })
        }
        if(user) {
            fetchNotifications();
        }
        
    }, [user, page])

    useEffect(() => {
        
        const resetUncheckedNotifications = () => {
            fetch(`http://localhost:4000/api/users/unchecked-notifications`, {
                method:'PATCH',
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resetNotifications();
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if(notificationsNum > 0) {
            resetUncheckedNotifications();
        }

    }, [user, notificationsNum])

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return ( <div className={notificationsClasses['notifications']}>
        <InfiniteScroll
            dataLength={notifications.length}
            next={handleLoadMore}
            hasMore={hasMore}
            endMessage={<p className={notificationsClasses['no-more-posts']}>No more notifications to load</p>}
            style={{overflow: 'hidden'}}
        >
            {
                notifications.map(note => {
                    return <NotificationsListItem key={note._id} note={note}/>
                })
            }
        </InfiniteScroll>    
    </div> );
}
 
export default Notifications;

