import { noteContext } from './note-context';
import { useState } from 'react';

const NoteProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(0);

    const addNotification = (num)=> {
        setNotifications(prev=>prev+num);
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