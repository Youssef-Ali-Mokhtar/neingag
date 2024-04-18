import PCNotificationsClasses from './pc-notifications.module.css';
import NotificationsListItem from './NotificationsListItem';
import { forwardRef, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useAuthContext } from './../../hooks/useAuthContext';
import { useNoteContext } from './../../hooks/useNoteContext';

const PCNotifications = (props, ref) => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();
    const {
        notifications: notificationsNum,
        resetNotifications
     } = useNoteContext();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting ) {
                    // Callback function when the target element is scrolled into view
                    if(hasMore) {
                        setPage(prev => prev+1);
                    }
                    // Perform your desired actions here
                }
            });
        }, {
            root: null, // Use the viewport as the root
            rootMargin: '0px', // No margin
            threshold: 0 // Trigger when the target element is fully visible
        });

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        // Clean up
        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [notifications, hasMore]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/users/notifications?page=${page}`, {
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
    }, [user, page])

    useEffect(() => {
        
        const resetUncheckedNotifications = () => {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/unchecked-notifications`, {
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

    return ( <div className={PCNotificationsClasses['notifications']} ref={ref}>
        {
            notifications.map(note => {
                return <NotificationsListItem key={note._id} note={note}/>
            })
        }
        {   notifications.length?
            <div 
                ref={targetRef}
                className={PCNotificationsClasses['notifications-target']}>-----</div>:''
        }
    </div> );
}
 
export default forwardRef(PCNotifications);