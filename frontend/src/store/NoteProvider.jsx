import { noteContext } from './note-context';
import { useState } from 'react';

const NoteProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(0);

    const addNotification = ()=> {
        console.log("NOTIFICATION ADDED");
        setNotifications(prev=>prev+1);
    }

    const resetNotifications = ()=> {
        setNotifications(0);
    }

    const contextValue = {
        notifications: notifications,
        addNotification: addNotification,
        resetNotifications: resetNotifications
    }

    return ( <noteContext.Provider value={ contextValue }>
        { children }
    </noteContext.Provider> );
}
 
export default NoteProvider;